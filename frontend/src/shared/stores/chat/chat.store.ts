import { IChat, IMessage } from '@/shared/config/types/chat.types'
import { create } from 'zustand'

interface ChatState {
  // Chats list
  chats: IChat[]

  // Active chat
  currentChatId: string | null

  // Messages
  messages: IMessage[]

  // Cache of recent messages by chatId
  // This helps when switching between chats
  messageCache: Record<string, IMessage[]>

  // UI states
  loading: boolean
  loadingMessages: boolean

  // Pagination
  page: number
  hasMore: boolean

  // Unread messages
  unreadCounts: Record<string, number>

  // Last read message
  lastReadMessageId: number | null
}

interface ChatActions {
  // Chats actions
  setChats: (chats: IChat[]) => void
  updateChat: (chatId: string, data: Partial<IChat>) => void
  updateChatLastMessage: (chatId: string, message: IMessage) => void

  // Current chat actions
  setCurrentChat: (chatId: string | null) => void

  // Messages actions
  setMessages: (messages: IMessage[]) => void
  addMessage: (message: IMessage) => void
  markMessageAsRead: (chatId: string, messageId: number) => void
  updateMessageReadStatus: (messageId: number, isRead: boolean) => void

  // UI state actions
  setLoading: (loading: boolean) => void
  setLoadingMessages: (loading: boolean) => void

  // Pagination actions
  setPage: (page: number) => void
  setHasMore: (hasMore: boolean) => void

  // Unread counts actions
  setUnreadCount: (chatId: string, count: number) => void
  resetUnreadCount: (chatId: string) => void

  // Misc actions
  setLastReadMessageId: (messageId: number | null) => void
  reset: () => void

  // Mark messages as read by a specific user
  markMessagesAsRead: (
    chatId: string,
    userId: string,
    messageId: number
  ) => void

  // Message cache actions
  clearMessageCache: (chatId: string) => void
}

type ChatStore = ChatState & ChatActions

// Initial state
const initialState: ChatState = {
  chats: [],
  currentChatId: null,
  messages: [],
  loading: false,
  loadingMessages: false,
  page: 1,
  hasMore: false,
  unreadCounts: {},
  lastReadMessageId: null,
  messageCache: {},
}

export const useChatStore = create<ChatStore>((set, get) => ({
  ...initialState,

  // Chats actions
  setChats: (chats) => set({ chats }),

  updateChat: (chatId, data) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, ...data } : chat
      ),
    })),

  updateChatLastMessage: (chatId, message) =>
    set((state) => {
      console.log(
        `[ChatStore] Updating chat ${chatId} with new message ${message.id} from ${message.userId}`
      )

      // Get existing chats
      const updatedChats = [...state.chats]

      // Find the chat to update
      const chatIndex = updatedChats.findIndex((c) => c.id === chatId)

      if (chatIndex === -1) {
        console.log(
          `[ChatStore] Chat ${chatId} not found in store, cannot update chat list`
        )

        // Even if chat is not in the list, we should still update the message cache
        // This ensures messages are not lost even if chat list isn't loaded yet
        const existingCache = state.messageCache[chatId] || []
        const messageExists = existingCache.some((m) => m.id === message.id)

        if (!messageExists) {
          console.log(
            `[ChatStore] Adding message ${message.id} to cache for chat ${chatId} (chat not in list)`
          )
          return {
            messageCache: {
              ...state.messageCache,
              [chatId]: [...existingCache, message],
            },
          }
        }

        return state // No other changes if chat not found and message already in cache
      }

      console.log(
        `[ChatStore] Found chat at index ${chatIndex}, updating last message`
      )

      // Create a new chat object with updated fields
      const updatedChat = {
        ...updatedChats[chatIndex],
        updatedAt: new Date().toISOString(),
        messages: [message], // Update last message
      }

      // Remove the chat from its current position
      updatedChats.splice(chatIndex, 1)

      // ALWAYS update the message cache for this chat
      // This ensures we don't lose messages when switching between chats
      const existingCache = state.messageCache[chatId] || []

      // Check if message already exists in cache
      const messageExists = existingCache.some((m) => m.id === message.id)

      // Only add to cache if it's a new message
      const updatedCache = messageExists
        ? existingCache
        : [...existingCache, message].sort((a, b) => a.id - b.id) // Sort by ID to maintain order

      if (!messageExists) {
        console.log(
          `[ChatStore] Added message ${message.id} to cache for chat ${chatId}`
        )
      }

      // Add the updated chat to the beginning of the array
      console.log(`[ChatStore] Moving updated chat to the top of the list`)
      return {
        chats: [updatedChat, ...updatedChats],
        messageCache: {
          ...state.messageCache,
          [chatId]: updatedCache,
        },
      }
    }),

  // Current chat actions
  setCurrentChat: (chatId) => {
    // If changing chats, clear messages and reset page
    if (chatId !== get().currentChatId) {
      set({
        currentChatId: chatId,
        messages: [],
        page: 1,
        hasMore: false,
        lastReadMessageId: null,
        // We don't clear the messageCache here - we keep it for all chats
      })
    }
  },

  // Messages actions
  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => {
      // IMPORTANT: Check if this message already exists to avoid duplicates
      if (state.messages.some((m) => m.id === message.id)) {
        console.log('[ChatStore] ⚠️ Skipping duplicate message:', message.id)
        return state // No change needed
      }

      console.log(
        '[ChatStore] ✅ Adding new message to current view:',
        message.id
      )

      // Create a new array with the message added
      // Sort by ID to ensure chronological order
      const updatedMessages = [...state.messages, message].sort(
        (a, b) => a.id - b.id
      )

      return {
        messages: updatedMessages,
      }
    }),

  markMessageAsRead: (chatId, messageId) =>
    set((state) => {
      // Только если messageId больше текущего lastReadMessageId
      if (
        state.lastReadMessageId === null ||
        messageId > state.lastReadMessageId
      ) {
        console.log(`[ChatStore] Updating lastReadMessageId to ${messageId}`)
        return {
          lastReadMessageId: messageId,
          unreadCounts: {
            ...state.unreadCounts,
            [chatId]: 0,
          },
        }
      }
      // Иначе только обновляем счетчик непрочитанных
      return {
        unreadCounts: {
          ...state.unreadCounts,
          [chatId]: 0,
        },
      }
    }),

  updateMessageReadStatus: (messageId, isRead) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, isRead } : message
      ),
    })),

  // UI state actions
  setLoading: (loading) => set({ loading }),
  setLoadingMessages: (loadingMessages) => set({ loadingMessages }),

  // Pagination actions
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => {
    console.log(`[ChatStore] Setting hasMore to ${hasMore}`)
    return set({ hasMore })
  },

  // Unread counts actions
  setUnreadCount: (chatId, count) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: count,
      },
    })),

  resetUnreadCount: (chatId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: 0,
      },
    })),

  // Misc actions
  setLastReadMessageId: (messageId) => set({ lastReadMessageId: messageId }),

  // Reset state
  reset: () => set(initialState),

  // Mark messages as read by a specific user
  markMessagesAsRead: (chatId, userId, messageId) => {
    console.log(
      `[ChatStore] Marking messages up to ID ${messageId} as read by user ${userId} in chat ${chatId}`
    )
    // This method is used when receiving 'messageRead' events from other users

    // For now, we'll just log that we received the read status update
    // The actual implementation may need more context about the current user
    console.log(`[ChatStore] Received read status update for ${chatId}`)
  },

  // Message cache actions
  clearMessageCache: (chatId) =>
    set((state) => {
      if (chatId) {
        // Clear cache for a specific chat
        const newCache = { ...state.messageCache }
        delete newCache[chatId]
        return { messageCache: newCache }
      } else {
        // Clear entire cache
        return { messageCache: {} }
      }
    }),
}))
