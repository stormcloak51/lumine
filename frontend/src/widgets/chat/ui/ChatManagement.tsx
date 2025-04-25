'use client'

import { ChatList } from '@/entities/chat/ui/ChatList'
import { ChatWindow } from '@/entities/chat/ui/ChatWindow'
import { useFriendsActions } from '@/entities/friend'
import { CreateChat } from '@/features/chat/ui/CreateChat'
import { useChat } from '@/shared/stores/chat/useChat'
import { Card } from '@mantine/core'
import { useCallback } from 'react'

export const ChatManagement = () => {
  const {
    createChat,
    joinChat,
    sendMessage,
    loadMoreMessages,
    markMessageAsRead,
    scrollToUnreadMessages,
    loadPreviousMessages,
    loadChats,
    chats,
  } = useChat()

  const { friends } = useFriendsActions()

  // Handle chat refresh
  const handleRefreshChats = useCallback(async () => {
    try {
      await loadChats()
    } catch (error) {
      console.error('Failed to refresh chats:', error)
    }
  }, [loadChats])

  const getFriendsWithoutChats = () => {
    const friendsWithoutChats = friends.filter((friend) => {
      return !chats.some((chat) =>
        chat.members.some((member) => member.id === friend.id)
      )
    })

    return friendsWithoutChats
  }

  return (
    <Card
      className="!bg-[#1f2124] w-full flex flex-row h-[80vh] shadow-lg rounded-xl border border-[rgb(66,66,66)] p-0"
      withBorder
      shadow="sm"
    >
      {/* Chat List Panel */}
      <div className="w-[30%] relative flex flex-col h-full overflow-hidden border-r border-gray-700">
        <ChatList onSelect={joinChat} onRefresh={handleRefreshChats} />
        <div className="absolute bottom-4 right-4 z-10">
          <CreateChat
            friendsCount={friends.length}
            friendsWithoutChat={getFriendsWithoutChats()}
            onSelect={createChat}
          />
        </div>
      </div>

      {/* Chat Window Panel */}
      <div className="w-[70%] flex flex-col h-full overflow-hidden">
        <ChatWindow
          sendMessage={sendMessage}
          fetchMessages={loadMoreMessages}
          markMessageAsRead={markMessageAsRead}
          scrollToUnreadMessages={scrollToUnreadMessages}
          loadPreviousMessages={loadPreviousMessages}
        />
      </div>
    </Card>
  )
}
