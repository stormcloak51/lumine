'use client'

import { IMessage } from '@/shared/config/types/chat.types'
import { Avatar } from '@mantine/core'
import { Check, CheckCheck } from 'lucide-react'
import { memo } from 'react'

export interface MessageItemProps {
  message: IMessage
  userId: string
  isLastRead?: boolean
}

export const MessageItem = memo(
  ({ message, userId, isLastRead }: MessageItemProps) => {
    const isSender = message.userId === userId
    const alignment = isSender ? 'justify-end' : 'justify-start'
    const bgColor = isSender ? 'bg-blue-600' : 'bg-gray-600'
    const textColor = 'text-white'
    const borderRadius = isSender
      ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl'
      : 'rounded-tl-xl rounded-tr-xl rounded-br-xl'

    return (
      <div
        id={`message-${message.id}`}
        data-message-id={message.id}
        className={`flex w-full mb-2 ${alignment} ${
          isLastRead
            ? 'relative after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-gray-400 after:top-0 after:opacity-30'
            : ''
        }`}
      >
        <div
          className={`flex items-end gap-2 max-w-[65%] ${
            isSender ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {!isSender && (
            <Avatar
              src={message.user.userAvatar || '/default-avatar.png'} // Fallback avatar
              alt={`${message.user.name} ${message.user.surname}`}
              size={30}
              radius="xl"
            />
          )}
          <div className="flex flex-col">
            {!isSender && (
              <span className="text-xs text-gray-400 mb-1 ml-1">
                {message.user.name || message.user.username}
              </span>
            )}
            <div
              className={`px-4 py-2 ${bgColor} ${textColor} ${borderRadius} shadow-md`}
            >
              <p className="text-sm break-words whitespace-pre-wrap max-w-[500px]">
                {message.content}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-300 block">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {isSender && (
                  <span className="ml-1">
                    {message.isRead ? (
                      <CheckCheck size={14} className="text-blue-300" />
                    ) : (
                      <Check size={14} className="text-gray-300" />
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isSender && (
            <Avatar
              src={message.user.userAvatar || '/default-avatar.png'} // Fallback avatar
              alt={`${message.user.name} ${message.user.surname}`}
              size={30}
              radius="xl"
            />
          )}
        </div>
      </div>
    )
  }
)

MessageItem.displayName = 'MessageItem'
