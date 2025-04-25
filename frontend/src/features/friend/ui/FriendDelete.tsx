'use client'

import { useFriendsActions } from '@/entities/friend'
import { ModalDeleteUi } from '@/shared/ui/Modal/ui/modal-delete'
import { ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Trash2 } from 'lucide-react'

export const FriendDelete = ({ friendId }: { friendId: string }) => {
  const { deleteFriend } = useFriendsActions()
  const [isOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false)

  return (
    <div>
      <ActionIcon size={28} onClick={openModal} className='text-red-500 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-all duration-300 p-1'>
        <Trash2 className='w-7 h-7 hover:text-red-500/80 transition-all duration-300' color='currentColor' />
      </ActionIcon>
      <ModalDeleteUi	
        opened={isOpened}
        onClose={closeModal}
        onSubmit={() => deleteFriend(friendId)}
        entity="friend"
      />
    </div>
  )
}
