'use client'

import { IUser } from '@/shared/config/types/user.types'
import { ReactNode } from 'react'
import { useFriendsActions } from '../model/friends.actions'

interface FriendListProps {
  renderItem: (friend: IUser) => ReactNode
  userFriends?: IUser[]
}

export const FriendList = ({ renderItem, userFriends }: FriendListProps) => {
  const { friends: myFriends } = useFriendsActions()

  const friends = userFriends || myFriends
  return (
    <div>
      <h1 className="text-white text-3xl font-bold text-center py-3">
        Friends - {friends.length}
      </h1>
      <div className="p-6">
        {friends.length !== 0 ? (
          <div className=" grid grid-cols-2 gap-2 md:grid-cols-3">
            {friends.map((friend) => renderItem(friend))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-white text-2xl font-bold">No friends</h1>
          </div>
        )}
      </div>
    </div>
  )
}
