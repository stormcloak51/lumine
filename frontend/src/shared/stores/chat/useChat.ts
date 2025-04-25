'use client'

import { chatService } from '@/shared/api/chat.service'
import { getSocket } from '@/shared/api/socket.service'
import { IChat, IMessage } from '@/shared/config/types/chat.types'
import { notifications } from '@mantine/notifications'
import debounce from 'lodash.debounce'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import { useAuth } from '../user/useAuth'
import { useChatStore } from './chat.store'

// Добавим интерфейсы для типизации ответов сервера
interface SendMessageResponse {
  success: boolean
  error?: string
  message?: IMessage
}

interface MarkReadResponse {
  success: boolean
  error?: string
  result?: any
}

export const useChat = () => {
  // Auth user
  const { user, isLoading: isUserLoading } = useAuth()

  // WebSocket reference
  const socketRef = useRef<Socket | null>(null)

  // Chat store
  const store = useChatStore()

  // Создаем хеш для отслеживания в процессе маркировки сообщений
  const markingMessages = useRef<Record<string, boolean>>({})

  // Отдельные query параметры для хендла клика вне чата
  const searchParams = useSearchParams()

  // Debug logging helper
  const logChatState = () => {
    console.log('==================== CHAT STATE ====================')
    console.log(
      `Current Chat ID: ${store.currentChatId || 'null'}`,
      `\nMessages in view: ${store.messages.length}`,
      `\nChats in store: ${store.chats.length}`,
      `\nCache size: ${Object.keys(store.messageCache).length} chats`
    )

    // Log message cache stats for each chat
    Object.entries(store.messageCache).forEach(([chatId, messages]) => {
      console.log(`Chat ${chatId} cache: ${messages.length} messages`)
    })

    console.log('====================================================')
  }

  // Initialize
  useEffect(() => {
    console.log('[Chat] Initializing chat hook')
    console.log(searchParams?.get('friendId'), 'Search Params')
    // Only proceed when user is loaded
    if (isUserLoading || !user.id) return

    // Connect to socket
    if (!socketRef.current) {
      console.log('[Chat] Setting up socket connection')
      socketRef.current = getSocket(user.id, 'chat')

      // We need to make sure socket is connected before setting up events
      socketRef.current.on('connect', () => {
        console.log('[Chat] Socket connected, setting up event handlers')
        cleanupSocketEvents() // Clean up any existing handlers
        setupSocketEvents() // Set up fresh handlers
      })

      // Also set up handlers immediately in case we're already connected
      if (socketRef.current.connected) {
        console.log(
          '[Chat] Socket already connected, setting up event handlers'
        )
        setupSocketEvents()
      }
    }

    // Initial load of chats
    loadChats()

    if (searchParams?.get('friendId')) {
      const chatWithFriend = useChatStore
        .getState()
        .chats.filter((chat) =>
          chat.members.some(
            (chatMember) => chatMember.id === searchParams?.get('friendId')
          )
        )
      if (chatWithFriend.length != 0) {
        joinChat(chatWithFriend[0].id)
        return
      }
      createChat(searchParams.get('friendId')!)
    }
    // Cleanup function
    return () => {
      cleanupSocketEvents()
    }
  }, [user.id, isUserLoading])

  // Setup socket event handlers
  const setupSocketEvents = () => {
    if (!socketRef.current) {
      console.error('[Chat] Socket not initialized in setupSocketEvents')
      return
    }

    console.log('[Chat] Setting up socket event handlers')

    // First, clean up any existing handlers to avoid duplicates
    cleanupSocketEvents()

    // New chat created
    socketRef.current.on('newChat', (data: { chat: IChat }) => {
      console.log('[Chat] 🆕 Received newChat event:', data.chat.id)

      // Check if we already have this chat
      const chatExists = store.chats.some((c) => c.id === data.chat.id)

      if (!chatExists) {
        console.log('[Chat] ✅ Adding new chat to list:', data.chat.id)
        store.setChats([data.chat, ...store.chats])
      } else {
        console.log('[Chat] ⚠️ Chat already exists in list:', data.chat.id)
      }
    })

    // New message arrived
    socketRef.current.on(
      'newMessage',
      (data: { chatId: string; message: IMessage }) => {
        console.log(
          '[Chat] ⭐️ Received newMessage event:',
          'chatId:',
          data.chatId,
          'messageId:',
          data.message.id,
          'from:',
          data.message.userId,
          'content:',
          data.message.content?.substring(0, 30)
        )

        // Log current state before processing
        logChatState()

        try {
          // Step 1: ALWAYS check for duplicate messages before any other processing
          const isDuplicate = store.messages.some(
            (m) => m.id === data.message.id
          )

          if (isDuplicate) {
            console.log(
              '[Chat] ⚠️ Duplicate message detected, skipping:',
              data.message.id
            )
            return
          }

          // Step 2: ALWAYS update the chat's last message in the list
          // This also updates the message cache internally
          store.updateChatLastMessage(data.chatId, data.message)

          // Step 3: Determine if we're currently in this chat
          const inCurrentChat =
            useChatStore.getState().currentChatId === data.chatId
          const fromCurrentUser = data.message.userId === user.id

          console.log(
            `[Chat] Message context: inCurrentChat=${inCurrentChat}, fromCurrentUser=${fromCurrentUser}, currentChatId=${useChatStore.getState().currentChatId || 'null'}`
          )

          // Step 4: Add the message to the current view if we're in this chat
          if (inCurrentChat) {
            console.log(
              '[Chat] ✅ Adding message to current chat view:',
              data.message.id
            )
            store.addMessage(data.message)

            // Step 5: Mark message as read if it's not from us and we're in the chat
            if (!fromCurrentUser) {
              markMessageAsRead(data.chatId, data.message.id)
            }
          }
          // Step 6: If we're not in the chat, increment unread count for messages from others
          else if (!fromCurrentUser) {
            console.log(
              '[Chat] 📊 Incrementing unread count for chat:',
              data.chatId
            )
            const currentCount = store.unreadCounts[data.chatId] || 0
            store.setUnreadCount(data.chatId, currentCount + 1)
          }

          // Log updated state after processing
          console.log('[Chat] State after processing message:')
          logChatState()
        } catch (error) {
          console.error('[Chat] ❌ Error handling newMessage event:', error)
        }
      }
    )

    // Chat updated (e.g. last message changed)
    socketRef.current.on(
      'chatUpdated',
      (data: { chatId: string; lastMessage: IMessage }) => {
        console.log(
          '[Chat] 🔄 Received chatUpdated event:',
          'chatId:',
          data.chatId,
          'lastMessageId:',
          data.lastMessage?.id
        )

        // Always update the chat's last message in the list
        store.updateChatLastMessage(data.chatId, data.lastMessage)
      }
    )

    // Message read by someone
    socketRef.current.on(
      'messageRead',
      debounce(
        (data: { chatId: string; userId: string; messageId: number }) => {
          console.log(
            '[Chat] 👁️ Received messageRead event:',
            'chatId:',
            data.chatId,
            'userId:',
            data.userId,
            'messageId:',
            data.messageId
          )

          // Update the read status of messages in the current chat
          if (useChatStore.getState().currentChatId === data.chatId) {
            store.markMessagesAsRead(data.chatId, data.userId, data.messageId)
          }
        },
        300
      )
    )

    console.log('[Chat] ✅ All socket event handlers set up successfully')
  }

  // Clean up socket event handlers
  const cleanupSocketEvents = () => {
    if (!socketRef.current) return

    console.log('[Chat] Cleaning up socket event handlers')

    // Remove all event listeners
    socketRef.current.off('newChat')
    socketRef.current.off('newMessage')
    socketRef.current.off('chatUpdated')
    socketRef.current.off('messageRead')

    console.log('[Chat] All socket event handlers cleaned up')
  }

  // Load chat list
  const loadChats = async () => {
    try {
      store.setLoading(true)
      console.log('[Chat] Loading chats')

      const response = await chatService.getChats()
      console.log(`[Chat] Loaded ${response.data.length} chats`)

      store.setChats(response.data)

      // Load unread counts for each chat
      for (const chat of response.data) {
        await updateUnreadCount(chat.id)
      }

      return response
    } catch (error) {
      console.error('[Chat] Error loading chats:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to load chats',
        color: 'red',
      })
    } finally {
      store.setLoading(false)
    }
  }

  // Join a chat room
  const joinChat = async (chatId: string) => {
    try {
      console.log(
        `[Chat] Joining chat: ${chatId}, current chat: ${useChatStore.getState().currentChatId}`
      )
      store.setLoadingMessages(true)

      // Leave current chat if any
      if (
        useChatStore.getState().currentChatId &&
        useChatStore.getState().currentChatId !== chatId
      ) {
        console.log(
          `[Chat] Leaving current chat: ${useChatStore.getState().currentChatId}`
        )
        await leaveChat(useChatStore.getState().currentChatId!)
      }

      // Set as current chat
      store.setCurrentChat(chatId)

      // Join the socket room - CRITICAL for receiving real-time messages
      if (socketRef.current) {
        try {
          console.log(`[Chat] Emitting joinChat event for chat: ${chatId}`)
          const joinResponse = await socketRef.current.emitWithAck<{
            success: boolean
            error?: string
          }>('joinChat', { chatId })
          console.log(`[Chat] Join response:`, joinResponse)

          if (!joinResponse.success) {
            throw new Error(joinResponse.error || 'Failed to join chat room')
          }
        } catch (error) {
          console.error(`[Chat] Error joining socket room:`, error)
          throw new Error('Failed to connect to chat room')
        }
      }

      // ЭТАП 1: Сначала получаем информацию о последнем прочитанном сообщении
      console.log(`[Chat] Getting last read message info for chat: ${chatId}`)
      const lastReadInfo = await chatService.getLastReadMessageInfo(chatId)
      console.log(`[Chat] Last read message info:`, lastReadInfo)

      // ЭТАП 2: Загружаем ТОЛЬКО страницу, на которой находится последнее прочитанное сообщение
      // Если нет последнего прочитанного сообщения, загружаем последнюю страницу
      const pageToLoad = lastReadInfo?.page || 1
      console.log(`[Chat] Loading ONLY page ${pageToLoad} for chat ${chatId}`)

      const messagesResponse = await chatService.getChatMessages(
        chatId,
        pageToLoad
      )
      console.log(
        `[Chat] Loaded ${messagesResponse.data.length} messages from page ${pageToLoad} (total: ${messagesResponse.total})`
      )

      // ЭТАП 3: Устанавливаем загруженную страницу и сообщения
      store.setPage(pageToLoad)

      // CRITICAL: Check the message cache for newer messages
      const cachedMessages = store.messageCache[chatId] || []

      if (cachedMessages.length > 0) {
        console.log(
          `[Chat] 💾 Found ${cachedMessages.length} cached messages for chat ${chatId}`
        )

        // Create a Set of IDs from server messages for efficient lookup
        const serverMessageIds = new Set(messagesResponse.data.map((m) => m.id))

        // Find cached messages that aren't in the server response
        const uniqueCachedMessages = cachedMessages.filter(
          (m) => !serverMessageIds.has(m.id)
        )

        if (uniqueCachedMessages.length > 0) {
          console.log(
            `[Chat] ✨ Adding ${uniqueCachedMessages.length} unique cached messages to view`
          )

          // Combine and sort by ID to ensure proper chronological order
          const combinedMessages = [
            ...messagesResponse.data,
            ...uniqueCachedMessages,
          ].sort((a, b) => a.id - b.id)

          // Set the combined messages to the view
          store.setMessages(combinedMessages)

          console.log(
            `[Chat] Combined view now has ${combinedMessages.length} messages (${messagesResponse.data.length} from server + ${uniqueCachedMessages.length} from cache)`
          )
        } else {
          console.log(
            `[Chat] No unique cached messages found, using server data only`
          )
          store.setMessages(messagesResponse.data)
        }
      } else {
        console.log(
          `[Chat] No cached messages for chat ${chatId}, using server data only`
        )
        store.setMessages(messagesResponse.data)
      }

      // Log the state after loading messages
      logChatState()

      // ЭТАП 3.5: Проверка наличия сообщений на следующей странице
      let hasMore = false
      if (messagesResponse.total > messagesResponse.data.length) {
        // Проверяем следующую страницу, действительно ли там есть сообщения
        const nextPage = pageToLoad + 1
        const testNextPageResponse = await chatService.getChatMessages(
          chatId,
          nextPage,
          1
        )

        // Устанавливаем hasMore в true только если следующая страница содержит сообщения
        hasMore = testNextPageResponse.data.length > 0
        console.log(
          `[Chat] Tested next page ${nextPage}, found ${testNextPageResponse.data.length} messages, hasMore=${hasMore}`
        )
      }

      store.setHasMore(hasMore)

      // ЭТАП 4: ТЕПЕРЬ устанавливаем lastReadMessageId
      // Делаем это после загрузки сообщений, чтобы избежать проблем с порядком обновления
      if (lastReadInfo && lastReadInfo.id) {
        console.log(`[Chat] Setting last read message ID: ${lastReadInfo.id}`)
        store.setLastReadMessageId(lastReadInfo.id)
      } else {
        console.log(`[Chat] No last read message found, setting to null`)
        store.setLastReadMessageId(null)
      }

      // Mark chat as read
      store.resetUnreadCount(chatId)

      // If we have messages and need to mark the latest as read
      if (messagesResponse.data.length > 0) {
        const latestMessage =
          messagesResponse.data[messagesResponse.data.length - 1]

        // Только если этот ID больше последнего прочитанного
        const currentLastReadId = store.lastReadMessageId

        if (!currentLastReadId || latestMessage.id > currentLastReadId) {
          console.log(
            `[Chat] Marking latest message as read: ${latestMessage.id}`
          )
          // Используем отдельный вызов для маркировки, чтобы избежать проблем с состоянием
          if (socketRef.current) {
            const response =
              await socketRef.current.emitWithAck<MarkReadResponse>(
                'markMessageRead',
                {
                  chatId,
                  messageId: latestMessage.id,
                  page: pageToLoad,
                }
              )

            if (response.success) {
              console.log(
                `[Chat] Marked latest message as read on server: ${latestMessage.id}`
              )
              store.setLastReadMessageId(latestMessage.id)
            }
          }
        } else {
          console.log(
            `[Chat] Latest message ${latestMessage.id} already read (last read: ${currentLastReadId})`
          )
        }
      }

      return messagesResponse
    } catch (error) {
      console.error('[Chat] Error joining chat:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to join chat',
        color: 'red',
      })

      store.reset()
    } finally {
      store.setLoadingMessages(false)
    }
  }

  // Leave a chat room
  const leaveChat = async (chatId: string) => {
    if (socketRef.current) {
      console.log(`[Chat] Leaving chat: ${chatId}`)
      await socketRef.current.emitWithAck('leaveChat', { chatId })
    }
  }

  // Send a new message
  const sendMessage = async (content: string) => {
    if (!useChatStore.getState().currentChatId || !socketRef.current) {
      notifications.show({
        title: 'Error',
        message: 'No chat selected or connection lost',
        color: 'red',
      })
      return
    }

    try {
      console.log(
        `[Chat] Sending message to ${useChatStore.getState().currentChatId}: "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`
      )

      const response = await socketRef.current.emitWithAck<SendMessageResponse>(
        'sendMessage',
        {
          chatId: useChatStore.getState().currentChatId,
          content,
        }
      )

      if (!response.success) {
        throw new Error(response.error || 'Failed to send message')
      }

      console.log('[Chat] Message sent successfully:', response.message?.id)

      // Optimistically add to UI
      if (response.message) {
        // Проверка на дубликаты сообщений
        const messageExists = store.messages.some(
          (m) => m.id === response.message!.id
        )
        if (messageExists) {
          console.log(
            '[Chat] Message already exists in store:',
            response.message.id
          )
        } else {
          store.addMessage(response.message)

          // После отправки сообщения проверяем, нужно ли обновить hasMore
          // Если мы на странице 1 и отправили новое сообщение, вероятно больше нет старых сообщений
          if (store.page === 1) {
            // Проверяем следующую страницу, есть ли там сообщения
            const testNextPage = await chatService.getChatMessages(
              useChatStore.getState().currentChatId!,
              2,
              1
            )
            if (testNextPage.data.length === 0) {
              console.log(
                '[Chat] No more messages to load after sending message, setting hasMore to false'
              )
              store.setHasMore(false)
            }
          }
        }
      }

      return response.message
    } catch (error) {
      console.error('[Chat] Error sending message:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to send message',
        color: 'red',
      })
    }
  }

  // Mark a message as read
  const markMessageAsRead = async (
    chatId: string,
    messageId: number,
    page = 1
  ) => {
    if (!chatId || !messageId || !socketRef.current) return

    // Создаем уникальный ключ для отслеживания текущей операции
    const operationKey = `${chatId}_${messageId}`

    // Проверяем, не выполняется ли уже эта операция
    if (markingMessages.current[operationKey]) {
      console.log(
        `[Chat] Operation already in progress: markMessageAsRead(${chatId}, ${messageId})`
      )
      return
    }

    try {
      // Получаем актуальное значение из store
      const lastReadMessageId = store.lastReadMessageId

      // ВАЖНО: Skip if already set to this ID or higher - никогда не отмечаем сообщения с меньшим ID, чем текущий lastReadMessageId
      if (lastReadMessageId !== null && messageId <= lastReadMessageId) {
        console.log(
          `[Chat] Skipping mark as read: message ${messageId} already read or older than last read ID: ${lastReadMessageId}`
        )
        return
      }

      // Помечаем, что операция в процессе выполнения
      markingMessages.current[operationKey] = true

      console.log(
        `[Chat] Marking message ${messageId} as read in chat ${chatId}, current lastReadMessageId: ${lastReadMessageId}`
      )

      const response = await socketRef.current.emitWithAck<MarkReadResponse>(
        'markMessageRead',
        {
          chatId,
          messageId,
          page,
        }
      )

      if (response.success) {
        console.log(
          '[Chat] Message marked as read successfully, updating store'
        )
        store.markMessageAsRead(chatId, messageId)
        // Сразу обновляем lastReadMessageId чтобы предотвратить повторные вызовы
        store.setLastReadMessageId(messageId)
      } else {
        console.error('[Chat] Failed to mark message as read:', response.error)
      }
    } catch (error) {
      console.error('[Chat] Error marking message as read:', error)
    } finally {
      // Убираем пометку о выполнении операции
      delete markingMessages.current[operationKey]
    }
  }

  // Load more messages (newer messages - when scrolling down)
  const loadMoreMessages = async (
    chatId: string,
    newPage: number,
    limit = 20
  ) => {
    if (!chatId || !store.hasMore) return null

    // Если это не текущий чат - игнорируем запрос
    if (chatId !== useChatStore.getState().currentChatId) {
      console.log(
        `[Chat] Ignoring loadMoreMessages for non-current chat: ${chatId}`
      )
      return null
    }

    try {
      console.log(
        `[Chat] Loading MORE (newer) messages for chat ${chatId}, page ${newPage}`
      )

      // Блокируем повторные запросы
      if (store.loadingMessages) {
        console.log('[Chat] Already loading messages, ignoring request')
        return null
      }

      store.setLoadingMessages(true)

      const response = await chatService.getChatMessages(chatId, newPage, limit)
      console.log(
        `[Chat] Loaded ${response.data.length} more messages from page ${newPage} (total: ${response.total})`
      )

      // Если сервер вернул пустой массив сообщений, значит больше нет сообщений для загрузки
      if (response.data.length === 0) {
        console.log(
          '[Chat] Server returned empty messages array, setting hasMore to false'
        )
        store.setHasMore(false)
        return response
      }

      // Фильтруем дубликаты перед добавлением
      const existingMessageIds = new Set(store.messages.map((m) => m.id))
      const newMessages = response.data.filter(
        (msg) => !existingMessageIds.has(msg.id)
      )

      if (newMessages.length === 0) {
        console.log('[Chat] No new messages to add, setting hasMore to false')
        store.setHasMore(false)
        return response
      }

      // Объединяем сообщения, добавляя новые В КОНЕЦ (newer messages)
      store.setMessages([...store.messages, ...newMessages])
      store.setPage(newPage)

      // Проверяем, есть ли еще сообщения для загрузки
      // Если total <= messages.length, значит больше нет сообщений для загрузки
      const hasMore = response.total > store.messages.length
      store.setHasMore(hasMore)
      console.log(
        `[Chat] Updated hasMore to ${hasMore} after loading page ${newPage}`
      )

      return response
    } catch (error) {
      console.error('[Chat] Error loading more messages:', error)
    } finally {
      store.setLoadingMessages(false)
    }

    return null
  }

  // Load previous (older) messages - when scrolling up
  const loadPreviousMessages = async () => {
    if (!useChatStore.getState().currentChatId || store.page <= 1) {
      console.log(
        '[Chat] Cannot load previous messages: already at page 1 or no chat selected'
      )
      return null
    }

    // Блокируем повторные запросы
    if (store.loadingMessages) {
      console.log('[Chat] Already loading messages, ignoring request')
      return null
    }

    try {
      store.setLoadingMessages(true)
      const prevPage = store.page - 1

      console.log(
        `[Chat] Loading PREVIOUS (older) messages for ${useChatStore.getState().currentChatId}, page ${prevPage}`
      )

      // Сохраняем ссылку на первое сообщение для восстановления позиции скролла
      const firstVisibleMessageElement = document.querySelector(
        '.messages-container [data-message-id]'
      )
      const firstVisibleMessageId =
        firstVisibleMessageElement?.getAttribute('data-message-id')
      const scrollPositionBefore =
        firstVisibleMessageElement?.getBoundingClientRect().top

      console.log(
        `[Chat] Current first visible message: ${firstVisibleMessageId}, position: ${scrollPositionBefore}px`
      )

      const response = await chatService.getChatMessages(
        useChatStore.getState().currentChatId!,
        prevPage
      )

      console.log(
        `[Chat] Loaded ${response.data.length} previous messages from page ${prevPage}`
      )

      // Фильтруем дубликаты перед добавлением
      const existingMessageIds = new Set(store.messages.map((m) => m.id))
      const newMessages = response.data.filter(
        (msg) => !existingMessageIds.has(msg.id)
      )

      if (newMessages.length === 0) {
        console.log('[Chat] No new previous messages to add')
        return response
      }

      // Объединяем сообщения, добавляя старые В НАЧАЛО (older messages)
      store.setMessages([...newMessages, ...store.messages])
      store.setPage(prevPage)

      // После обновления DOM восстанавливаем позицию скролла
      if (firstVisibleMessageId && scrollPositionBefore) {
        setTimeout(() => {
          const sameMessageAfter = document.querySelector(
            `[data-message-id="${firstVisibleMessageId}"]`
          )
          if (sameMessageAfter) {
            const scrollPositionAfter =
              sameMessageAfter.getBoundingClientRect().top
            const scrollDiff = scrollPositionAfter - scrollPositionBefore

            if (Math.abs(scrollDiff) > 5) {
              // Если позиция значительно изменилась
              const container = document.querySelector('.messages-container')
              if (container && container instanceof HTMLElement) {
                container.scrollTop += scrollDiff
                console.log(
                  `[Chat] Adjusted scroll position by ${scrollDiff}px to maintain view`
                )
              }
            }
          }
        }, 10)
      }

      return response
    } catch (error) {
      console.error('[Chat] Error loading previous messages:', error)
    } finally {
      store.setLoadingMessages(false)
    }

    return null
  }

  // Create a new chat
  const createChat = async (friendId: string) => {
    try {
      console.log(`[Chat] Creating chat with friend: ${friendId}`)
      store.setLoading(true)

      const response = await chatService.createChat(friendId)
      console.log(`[Chat] Chat created: ${response.id}`)

      // Add new chat to the list and select it
      store.setChats([response, ...store.chats])
      store.setCurrentChat(response.id)

      // Join the new chat
      await joinChat(response.id)

      return response
    } catch (error) {
      console.error('[Chat] Error creating chat:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to create chat',
        color: 'red',
      })
    } finally {
      store.setLoading(false)
    }
  }

  // Update unread count for a chat
  const updateUnreadCount = async (chatId: string) => {
    try {
      const count = await chatService.getUnreadMessagesCount(chatId)
      store.setUnreadCount(chatId, count)
      return count
    } catch (error) {
      console.error(
        `[Chat] Error getting unread count for chat ${chatId}:`,
        error
      )
      return 0
    }
  }

  // Get last read message and scroll to it
  const scrollToUnreadMessages = async (
    chatId: string
  ): Promise<number | null> => {
    try {
      console.log(`[Chat] Finding last read message for ${chatId}`)
      const info = await chatService.getLastReadMessageInfo(chatId)

      // Если последнее прочитанное сообщение не найдено или не на текущей странице,
      // нужно загрузить правильную страницу
      if (info && info.id && info.page !== store.page) {
        console.log(
          `[Chat] Last read message is on page ${info.page} but we are on page ${store.page}, switching pages`
        )

        try {
          store.setLoadingMessages(true)

          // Загружаем сообщения на странице с последним прочитанным сообщением
          const response = await chatService.getChatMessages(chatId, info.page)

          // Обновляем страницу и сообщения
          store.setPage(info.page)
          store.setMessages(response.data)

          // Проверяем есть ли еще сообщения
          const hasMore = response.total > response.data.length
          store.setHasMore(hasMore)

          console.log(
            `[Chat] Loaded messages from page ${info.page} for scrolling to last read message ${info.id}`
          )
        } finally {
          store.setLoadingMessages(false)
        }
      }

      return info?.id || null
    } catch (error) {
      console.error('[Chat] Error getting last read message info:', error)
      return null
    }
  }

  // Get current chat
  const getCurrentChat = useCallback(() => {
    return (
      store.chats.find(
        (chat) => chat.id === useChatStore.getState().currentChatId
      ) || null
    )
  }, [store.chats, useChatStore.getState().currentChatId])

  return {
    // State
    chats: store.chats,
    currentChatId: useChatStore.getState().currentChatId,
    getCurrentChat,
    messages: store.messages,
    loading: store.loading,
    loadingMessages: store.loadingMessages,
    page: store.page,
    hasMore: store.hasMore,
    unreadCounts: store.unreadCounts,
    lastReadMessageId: store.lastReadMessageId,

    // Actions
    loadChats,
    joinChat,
    leaveChat,
    sendMessage,
    markMessageAsRead,
    loadMoreMessages,
    loadPreviousMessages,
    createChat,
    scrollToUnreadMessages,
  }
}
