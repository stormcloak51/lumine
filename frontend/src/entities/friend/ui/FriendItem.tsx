'use client'

import { IUser } from '@/shared/config/types/user.types'
import { useFriendshipStore } from '@/shared/stores/friendship/friendship.store'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Avatar, Card } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface FriendItemProps {
  friend: IUser
  actions: {
    removeFriend: (friendId: string) => ReactNode
    openChat: (friendId: string) => ReactNode
    addFriend: (friendId: string) => ReactNode
  }
}

export const FriendItem = ({ friend, actions }: FriendItemProps) => {
  const router = useRouter()
  const { friends } = useFriendshipStore()
  const {
    user: { id },
  } = useAuth()
  return (
    <Card className="bg-[#282b2f] rounded-xl flex flex-row justify-between items-center">
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          router.push(`/profile/${friend.username}`)
        }}
      >
        <Avatar src={friend.userAvatar} />
        <div className="flex flex-col">
          <h1 className="text-white text-lg font-bold">
            {friend.name} {friend.surname}
          </h1>
          <p
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(friend.username)
              notifications.show({
                title: 'Username copied',
                message: 'Username copied to clipboard',
                color: 'green',
              })
            }}
            className="text-gray-400 text-sm hover:text-gray-300 transition-all duration-300"
          >
            @{friend.username}
          </p>
        </div>
      </div>
      <div className="flex gap-x-2">
        {friend.id === id ? (
          <></>
        ) : friends.some((frnd) => frnd.id === friend.id) ? (
          <>
            {actions.removeFriend(friend.id)}
            {actions.openChat(friend.id)}
          </>
        ) : (
          <>{actions.addFriend && actions.addFriend(friend.id)}</>
        )}
      </div>
    </Card>
  )
}
