import { IUser } from './user.types'

export interface IChat {
  id: string
  createdAt: string
  updatedAt: string
  members: IUser[]
  messages: IMessage[]
  unreadCount?: number
}

export interface IMessage {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  chatId: string
  userId: string
  user: IUser
  isRead?: boolean
}

export interface ILastReadMessage {
  id: string
  userId: string
  chatId: string
  messageId: number
  readAt: string
}

export interface IPaginatedResponse<T> {
  data: T[]
  limit: number
  page: number
  total: number
}
