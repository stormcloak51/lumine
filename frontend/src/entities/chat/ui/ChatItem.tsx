import { IChat } from '@/shared/config/types/chat.types'
import { useChatStore } from '@/shared/stores/chat/chat.store'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Avatar, Badge, Text } from '@mantine/core'
import { formatDistanceToNow } from 'date-fns'
import { memo } from 'react'

interface ChatItemProps {
  chat: IChat
  onSelect: (chatId: string) => void
}

export const ChatItem = memo(({ chat, onSelect }: ChatItemProps) => {
  const { currentChatId, unreadCounts } = useChatStore()
  const { user } = useAuth()
  const unreadCount = unreadCounts[chat.id] || 0
  const isActive = currentChatId === chat.id

  // Find chat partner (exclude current user)
  const chatPartner =
    chat.members.find((member) => member.id !== user.id) || chat.members[0]

  // Get last message if it exists
  const lastMessage =
    chat.messages && chat.messages.length > 0 ? chat.messages[0] : null

  // Format date for last message
  const lastMessageTime = lastMessage
    ? formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })
    : ''

  return (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-[#3a3d45] hover:bg-[#3a3d45]' : 'hover:bg-[#2a2c31]'
      }`}
      onClick={() => onSelect(chat.id)}
    >
      <div className="relative mr-3">
        <Avatar
          src={chatPartner.userAvatar}
          radius="xl"
          size="md"
          color="blue"
        />
        {unreadCount > 0 && (
          <Badge
            color="red"
            radius="xl"
            size="xs"
            className="absolute -top-1 -right-1"
          >
            {unreadCount}
          </Badge>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <Text
            className={`font-medium truncate ${isActive ? 'text-white' : 'text-gray-200'}`}
          >
            {chatPartner.name || chatPartner.username}
          </Text>
          {lastMessage && (
            <Text size="xs" className="text-gray-400 whitespace-nowrap ml-2">
              {lastMessageTime}
            </Text>
          )}
        </div>

        <Text
          className={`text-xs truncate ${
            unreadCount > 0 ? 'text-gray-100 font-medium' : 'text-gray-400'
          }`}
        >
          {lastMessage
            ? lastMessage.userId === user.id
              ? `You: ${lastMessage.content}`
              : lastMessage.content
            : 'No messages yet'}
        </Text>
      </div>
    </div>
  )
})

ChatItem.displayName = 'ChatItem'
