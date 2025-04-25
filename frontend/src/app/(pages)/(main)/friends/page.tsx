'use client'

import { FriendItem, FriendList } from '@/entities/friend'
import { FriendAdd } from '@/features/friend/ui/FriendAdd'
import { FriendDelete } from '@/features/friend/ui/FriendDelete'
import { OpenChat } from '@/features/friend/ui/OpenChat'

export default function Page() {
  return (
    <FriendList
      renderItem={(friend) => (
        <FriendItem
          key={friend.id}
          friend={friend}
          actions={{
            removeFriend: () => <FriendDelete friendId={friend.id} />,
            addFriend: () => (
              <FriendAdd
                name={friend.name}
                surname={friend.surname}
                userId={friend.id}
              />
            ),
            openChat: () => <OpenChat friendId={friend.id} />,
          }}
        />
      )}
    />
  )
}
