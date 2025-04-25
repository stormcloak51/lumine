'use client'

import { useFriendship } from '@/shared/hooks/useFriendship'
import { ActionIcon } from '@mantine/core'
import { PlusIcon } from 'lucide-react'

export const FriendAdd = ({
  name,
  surname,
  userId,
}: {
  name: string
  surname: string
  userId: string
}) => {
  const { sendFriendRequest } = useFriendship()

  return (
    <ActionIcon
      size={28}
      onClick={() => sendFriendRequest(name, surname, userId)}
      className="bg-primary-600 bg-primary-400/20 rounded-full hover:bg-primary-600/30 transition-all duration-300 p-1"
    >
      <PlusIcon
        className="w-7 h-7 hover:text-primary-500/80 transition-all duration-300"
        color="currentColor"
      />
    </ActionIcon>
  )
}
