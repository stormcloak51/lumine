import {
  IChat,
  ILastReadMessage,
  IMessage,
  IPaginatedResponse,
} from '../config/types/chat.types'
import { api } from './base'

class ChatService {
  private BASE_URL = 'chat'

  async getChats(page: number = 1, limit: number = 10) {
    console.log(`[ChatService] Getting chats: page=${page}, limit=${limit}`)
    try {
      const response = await api.get<IPaginatedResponse<IChat>>(
        `${this.BASE_URL}?page=${page}&limit=${limit}`
      )
      console.log(
        `[ChatService] Got ${response.data.length} chats, total: ${response.total}`
      )
      return response
    } catch (error) {
      console.error('[ChatService] Error getting chats:', error)
      throw error
    }
  }

  async createChat(friendId: string) {
    console.log(`[ChatService] Creating chat with friend: ${friendId}`)
    try {
      const response = await api.post<IChat>(`${this.BASE_URL}/create`, {
        friendId,
      })
      console.log(`[ChatService] Chat created with ID: ${response.id}`)
      return response
    } catch (error) {
      console.error('[ChatService] Error creating chat:', error)
      throw error
    }
  }

  async getChatMessages(chatId: string, page: number = 1, limit: number = 20) {
    console.log(
      `[ChatService] Getting messages for chat ${chatId}: page=${page}, limit=${limit}`
    )
    try {
      const response = await api.get<IPaginatedResponse<IMessage>>(
        `${this.BASE_URL}/${chatId}/messages?page=${page}&limit=${limit}`
      )
      console.log(
        `[ChatService] Got ${response.data.length} messages for chat ${chatId}`
      )
      return response
    } catch (error) {
      console.error(
        `[ChatService] Error getting messages for chat ${chatId}:`,
        error
      )
      throw error
    }
  }

  async getUnreadMessagesCount(chatId: string) {
    try {
      const response = await api.get<{ count: number }>(
        `${this.BASE_URL}/${chatId}/unread`
      )
      return response.count
    } catch (error) {
      console.error(
        `[ChatService] Error getting unread count for chat ${chatId}:`,
        error
      )
      return 0 // Return 0 as fallback
    }
  }

  async getLastReadMessageId(chatId: string) {
    try {
      const response = await api.get<{ messageId: number | null }>(
        `${this.BASE_URL}/${chatId}/last-read`
      )
      return response.messageId
    } catch (error) {
      console.error(
        `[ChatService] Error getting last read message ID for chat ${chatId}:`,
        error
      )
      return null
    }
  }

  async getLastReadMessageInfo(chatId: string) {
    try {
      const response = await api.get<{ id: number | null; page: number }>(
        `${this.BASE_URL}/${chatId}/last-read`
      )
      return response
    } catch (error) {
      console.error(
        `[ChatService] Error getting last read message info for chat ${chatId}:`,
        error
      )
      return { id: null, page: 1 }
    }
  }

  async markMessageAsRead(chatId: string, messageId: number, page: number = 1) {
    try {
      const response = await api.post<ILastReadMessage>(
        `${this.BASE_URL}/${chatId}/mark-read`,
        { messageId, page }
      )
      return response
    } catch (error) {
      console.error(
        `[ChatService] Error marking message ${messageId} as read in chat ${chatId}:`,
        error
      )
      throw error
    }
  }
}

export const chatService = new ChatService()
