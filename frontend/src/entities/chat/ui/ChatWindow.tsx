import { CreateMessage } from '@/features/chat/ui/CreateMessage'
import { useChatStore } from '@/shared/stores/chat/chat.store'
import { useAuth } from '@/shared/stores/user/useAuth'
import { ActionIcon, Badge, Loader } from '@mantine/core'
import { ArrowDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MessageItem } from './MessageItem'

interface ChatWindowProps {
  sendMessage: (message: string) => void
  fetchMessages: (chatId: string, newPage: number, limit: number) => void
  markMessageAsRead: (chatId: string, messageId: number, page: number) => void
  scrollToUnreadMessages: (chatId: string) => Promise<number | null>
  loadPreviousMessages?: () => Promise<any>
}

export const ChatWindow = ({
  sendMessage,
  fetchMessages,
  markMessageAsRead,
  scrollToUnreadMessages,
  loadPreviousMessages,
}: ChatWindowProps) => {
  const {
    currentChatId,
    messages,
    loading,
    page,
    unreadCounts,
    lastReadMessageId,
    hasMore,
  } = useChatStore()
  const {
    user: { id: userId },
  } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)
  const loadPreviousTriggerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const unreadCount = currentChatId ? unreadCounts[currentChatId] || 0 : 0
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const isScrollingRef = useRef(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const initialLoadRef = useRef(true)
  const [hasUserScrolled, setHasUserScrolled] = useState(false)

  // Reset states when changing chats
  useEffect(() => {
    setShowScrollButton(false)
    setHasNewMessages(false)
    setIsLoadingMore(false)
    setIsLoadingPrevious(false)
    setAutoScrollEnabled(true)
    setHasUserScrolled(false)
    initialLoadRef.current = true

    if (currentChatId) {
      // Scroll to bottom when changing chats
      setTimeout(() => {
        scrollToBottom(false) // Instant scroll without animation

        // Разрешаем загрузку только после исходного скролла
        setTimeout(() => {
          initialLoadRef.current = false
        }, 500)
      }, 100)
    }
  }, [currentChatId])

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!messagesContainerRef.current || !currentChatId) return

    // Если это первая загрузка, просто пропускаем настройку наблюдателей
    if (initialLoadRef.current) {
      console.log('[ChatWindow] Skipping observers setup during initial load')
      return
    }

    let lastLoadTime = 0 // Время последней загрузки
    const THROTTLE_DELAY = 2000 // Минимальная задержка между запросами (2 секунды)

    // Observer for loading newer messages (bottom) - загружает когда скроллим ВНИЗ
    const moreObserver = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        const now = Date.now()

        // Проверка нужно ли вообще загружать дополнительные сообщения
        if (!hasMore) {
          console.log(
            '[ChatWindow] No more messages to load, ignoring intersection'
          )
          return
        }

        // Проверка троттлинга
        if (now - lastLoadTime < THROTTLE_DELAY) {
          console.log('[ChatWindow] Throttling load request, too soon')
          return
        }

        if (
          entry.isIntersecting &&
          !isLoadingMore &&
          hasMore &&
          currentChatId &&
          hasUserScrolled // Требуем явный скролл пользователя
        ) {
          console.log(
            '[ChatWindow] Bottom threshold reached, loading more messages'
          )
          setIsLoadingMore(true)
          lastLoadTime = now

          try {
            // Загружаем следующую страницу (page + 1)
            await fetchMessages(currentChatId, page + 1, 20)
          } catch (error) {
            console.error('[ChatWindow] Error loading more messages:', error)
          } finally {
            setIsLoadingMore(false)
          }
        }
      },
      {
        threshold: 0.1,
        // Используем rootMargin для загрузки сообщений заранее (до того, как элемент полностью появится в видимой области)
        rootMargin: '0px 0px 200px 0px',
      }
    )

    if (loadMoreTriggerRef.current) {
      moreObserver.observe(loadMoreTriggerRef.current)
    }

    return () => {
      moreObserver.disconnect()
    }
  }, [
    currentChatId,
    page,
    isLoadingMore,
    hasMore,
    fetchMessages,
    autoScrollEnabled,
    hasUserScrolled,
    initialLoadRef,
  ])

  // Scroll detection
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100

      // Отмечаем, что пользователь явно проскроллил содержимое
      if (!hasUserScrolled) {
        setHasUserScrolled(true)
        console.log(
          '[ChatWindow] User has scrolled, enabling pagination loading'
        )
      }

      setShowScrollButton(!isAtBottom)
      setAutoScrollEnabled(isAtBottom)

      // Mark visible messages as read
      if (
        currentChatId &&
        messages.length > 0 &&
        !isLoadingMore &&
        !isLoadingPrevious
      ) {
        markVisibleMessages(container)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentChatId, messages, isLoadingMore, isLoadingPrevious])

  // Handle auto-scrolling when new messages arrive
  useEffect(() => {
    if (autoScrollEnabled && messages.length > 0) {
      scrollToBottom()
    } else if (!autoScrollEnabled && messages.length > 0) {
      setHasNewMessages(true)
    }
  }, [messages, autoScrollEnabled])

  // Function to scroll to bottom
  const scrollToBottom = useCallback(
    (smooth = true) => {
      if (isScrollingRef.current) return

      isScrollingRef.current = true

      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'end',
        })
      }

      // If we have a current chat, mark the latest message as read
      if (currentChatId && messages.length > 0) {
        const latestMessageId = messages[messages.length - 1].id
        markMessageAsRead(currentChatId, latestMessageId, page)
      }

      setHasNewMessages(false)
      setAutoScrollEnabled(true)

      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    },
    [currentChatId, messages, markMessageAsRead, page]
  )

  // НОВАЯ функция для получения всех видимых сообщения
  const getVisibleMessages = useCallback((container: HTMLElement) => {
    if (!container) return []

    const messageElements = container.querySelectorAll('[data-message-id]')
    if (messageElements.length === 0) return []

    const containerRect = container.getBoundingClientRect()
    const visibleMessages: { id: number; element: Element; visible: number }[] =
      []

    messageElements.forEach((element) => {
      const rect = element.getBoundingClientRect()

      // Вычисляем насколько элемент видим (от 0 до 1)
      const visibleTop = Math.max(rect.top, containerRect.top)
      const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const percentVisible = visibleHeight / rect.height

      if (percentVisible > 0) {
        const messageId = parseInt(
          element.getAttribute('data-message-id') || '0'
        )
        if (messageId > 0) {
          visibleMessages.push({
            id: messageId,
            element,
            visible: percentVisible,
          })
        }
      }
    })

    return visibleMessages
  }, [])

  // Сохраняем список видимых сообщений перед загрузкой старых
  const prevVisibleMessagesRef = useRef<
    Array<{ id: number; element: Element; visible: number }>
  >([])

  // Улучшенная функция для маркировки видимых сообщений
  const markVisibleMessages = useCallback(
    (container: HTMLDivElement) => {
      if (!currentChatId || messages.length === 0) return

      const visibleMessages = getVisibleMessages(container)
      if (visibleMessages.length === 0) return

      // Находим последнее (самое новое) видимое сообщение
      const latestVisibleMessage = visibleMessages.reduce(
        (latest, current) => (current.id > latest.id ? current : latest),
        visibleMessages[0]
      )

      // Маркируем как прочитанное последнее видимое сообщение,
      // но ТОЛЬКО если его ID больше, чем ID последнего прочитанного сообщения
      if (
        latestVisibleMessage &&
        latestVisibleMessage.id &&
        (!lastReadMessageId || latestVisibleMessage.id > lastReadMessageId)
      ) {
        console.log(
          `[ChatWindow] Marking latest visible message as read: ${latestVisibleMessage.id}, current lastReadMessageId: ${lastReadMessageId}`
        )
        markMessageAsRead(currentChatId, latestVisibleMessage.id, page)
      } else if (latestVisibleMessage) {
        console.log(
          `[ChatWindow] Skipping marking message ${latestVisibleMessage.id} - not newer than last read (${lastReadMessageId})`
        )
      }
    },
    [
      currentChatId,
      messages,
      markMessageAsRead,
      page,
      getVisibleMessages,
      lastReadMessageId,
    ]
  )

  // Логика для обработки загрузки предыдущих сообщений (старые сообщения)
  const handleLoadPreviousMessages = useCallback(async () => {
    if (!loadPreviousMessages || isLoadingPrevious || page <= 1) {
      return
    }

    // Сохраняем текущие видимые сообщения
    if (messagesContainerRef.current) {
      prevVisibleMessagesRef.current = getVisibleMessages(
        messagesContainerRef.current
      )
      console.log(
        '[ChatWindow] Saving scroll position for',
        prevVisibleMessagesRef.current.map((m) => m.id).join(', ')
      )
    }

    setIsLoadingPrevious(true)
    console.log('[ChatWindow] Manually loading previous messages')

    try {
      await loadPreviousMessages()
    } catch (error) {
      console.error('[ChatWindow] Error loading previous messages:', error)
    } finally {
      setIsLoadingPrevious(false)
    }
  }, [loadPreviousMessages, isLoadingPrevious, page, getVisibleMessages])

  // Intersection Observer для верхнего триггера
  useEffect(() => {
    if (
      !messagesContainerRef.current ||
      !currentChatId ||
      !loadPreviousTriggerRef.current
    ) {
      return
    }

    // Обсервер для загрузки предыдущих сообщений
    const previousObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (
          entry.isIntersecting &&
          !isLoadingPrevious &&
          page > 1 &&
          hasUserScrolled &&
          !initialLoadRef.current
        ) {
          handleLoadPreviousMessages()
        }
      },
      { threshold: 0.5 }
    )

    previousObserver.observe(loadPreviousTriggerRef.current)

    return () => {
      previousObserver.disconnect()
    }
  }, [
    currentChatId,
    page,
    isLoadingPrevious,
    hasUserScrolled,
    handleLoadPreviousMessages,
    initialLoadRef,
  ])

  // Function to scroll to unread messages
  const handleScrollToUnread = async () => {
    if (!currentChatId || isScrollingRef.current) return

    isScrollingRef.current = true

    try {
      const lastReadId = await scrollToUnreadMessages(currentChatId)

      if (lastReadId) {
        // Find the message element to scroll to using the data attribute
        const messageElement = document.querySelector(
          `[data-message-id="${lastReadId}"]`
        )
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

          // Highlight the message temporarily
          messageElement.classList.add('bg-opacity-20', 'bg-blue-500')
          setTimeout(() => {
            messageElement.classList.remove('bg-opacity-20', 'bg-blue-500')
          }, 2000)
        } else {
          // If message not found, just scroll to bottom
          scrollToBottom()
        }
      } else {
        // If no last read message, scroll to bottom
        scrollToBottom()
      }
    } catch (error) {
      console.error('Error scrolling to unread messages:', error)
    } finally {
      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }
  }

  // Автоматическая проверка наличия скролла и возможности показать предыдущие сообщения
  useEffect(() => {
    if (
      !messagesContainerRef.current ||
      !currentChatId ||
      page <= 1 ||
      initialLoadRef.current
    ) {
      return
    }

    // Проверяем, есть ли скролл в контейнере сообщений
    const container = messagesContainerRef.current
    const hasScroll = container.scrollHeight > container.clientHeight

    // Если сообщений мало и скролла нет, но страница не первая -
    // показываем кнопку загрузки предыдущих сообщений
    if (!hasScroll && messages.length > 0 && page > 1) {
      console.log(
        '[ChatWindow] No scroll detected but page > 1, showing load previous button'
      )
    }
  }, [currentChatId, messages, page, initialLoadRef])

  return (
    <div className="flex flex-col h-full bg-[#2a2c31] rounded-lg overflow-hidden">
      {!currentChatId ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          {/* Placeholder Icon (Optional) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-lg font-medium">
            Select a chat to start messaging
          </span>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader color="blue" />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Debug info */}
          <div className="absolute top-0 right-0 z-50 bg-black bg-opacity-50 text-white text-xs p-1 rounded-bl-md">
            Page: {page} | hasMore: {hasMore ? 'Y' : 'N'} | Scrolled:{' '}
            {hasUserScrolled ? 'Y' : 'N'}
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="flex-grow overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent relative messages-container"
          >
            {/* Previous messages loading indicator */}
            <div
              ref={loadPreviousTriggerRef}
              className="h-4 w-full my-2 flex items-center justify-center"
            >
              {isLoadingPrevious ? (
                <Loader size="xs" />
              ) : (
                page > 1 && (
                  <button
                    onClick={handleLoadPreviousMessages}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded px-2 py-1 cursor-pointer transition-colors"
                  >
                    Загрузить предыдущие сообщения
                  </button>
                )
              )}
            </div>

            {/* Message list */}
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                userId={userId}
                isLastRead={message.id === lastReadMessageId}
              />
            ))}

            {/* More messages loading indicator */}
            <div
              ref={loadMoreTriggerRef}
              className="h-1 w-full my-2 flex items-center justify-center"
            >
              {isLoadingMore && <Loader size="xs" />}
            </div>

            {/* Element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Floating action buttons */}
          <div className="fixed bottom-20 right-10 z-10 flex flex-col gap-2">
            {/* Scroll to unread button - only show when there are unread messages */}
            {unreadCount > 0 && (
              <ActionIcon
                color="red"
                variant="filled"
                radius="xl"
                size="lg"
                onClick={handleScrollToUnread}
                className="shadow-lg"
              >
                <Badge
                  color="red"
                  size="sm"
                  radius="xl"
                  className="absolute -top-2 -right-2"
                >
                  {unreadCount}
                </Badge>
                <ArrowDown size={18} />
              </ActionIcon>
            )}

            {/* Regular scroll to bottom button */}
            {showScrollButton && (
              <ActionIcon
                color="blue"
                variant="filled"
                radius="xl"
                size="lg"
                onClick={() => scrollToBottom()}
                className="shadow-lg"
              >
                <ArrowDown size={18} />
                {hasNewMessages && (
                  <Badge
                    color="red"
                    size="xs"
                    radius="xl"
                    className="absolute -top-2 -right-2"
                  >
                    new
                  </Badge>
                )}
              </ActionIcon>
            )}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="flex-shrink-0 p-2 border-t border-gray-700">
            <CreateMessage onSend={sendMessage} />
          </div>
        </div>
      )}
    </div>
  )
}
