'use client'

import { useChatStore } from '@/shared/stores/chat/chat.store'
import { Loader, Text } from '@mantine/core'
import { MessageCircle, RefreshCcw } from 'lucide-react'
import { memo } from 'react'

import { ChatItem } from './ChatItem'

interface ChatListProps {
  onSelect: (chatId: string) => void
  onRefresh?: () => Promise<void>
}

export const ChatList = memo(({ onSelect, onRefresh }: ChatListProps) => {
  const { chats, loading } = useChatStore()

  return (
    <div className="flex flex-col h-full">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <Text className="font-semibold text-white flex items-center">
          <MessageCircle className="mr-2" size={18} />
          Chats
        </Text>

        {onRefresh && (
          <button
            onClick={() => onRefresh()}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            <RefreshCcw
              size={16}
              className={
                loading ? 'animate-spin text-gray-400' : 'text-gray-300'
              }
            />
          </button>
        )}
      </div>

      {/* Chat list */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {loading && chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader size="md" color="blue" />
            <Text size="sm" color="dimmed" mt={2}>
              Loading chats...
            </Text>
          </div>
        ) : chats.length > 0 ? (
          <div className="flex flex-col py-2">
            {chats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageCircle size={48} className="text-gray-500 mb-2" />
            <Text className="text-gray-400 mb-1">No chats yet</Text>
            <Text size="xs" color="dimmed">
              Start a new conversation using the + button below
            </Text>
          </div>
        )}
      </div>
    </div>
  )
})

ChatList.displayName = 'ChatList'
