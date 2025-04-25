'use client'

import { useFriendsActions } from '@/entities/friend'
import { IUser } from '@/shared/config/types/user.types'
import { useFriendship } from '@/shared/hooks/useFriendship'
import { useFriendshipStore } from '@/shared/stores/friendship/friendship.store'
import { ModalDeleteUi } from '@/shared/ui/Modal/ui/modal-delete'
import { Button, Card, Loader, Title } from '@mantine/core'
import { MessageSquare, UserMinus, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export const ActionsSection = ({ user }: { user: IUser }) => {
  const { sendFriendRequest } = useFriendship()
  const { deleteFriend } = useFriendsActions()
  const { friends, isLoading } = useFriendshipStore()
  const [isDeleteFriendModalOpened, setIsDeleteFriendModalOpened] =
    useState(false)
  const router = useRouter()

  const handleWriteMessage = useCallback(() => {
    router.push(`/chats?friendId=${user.id}`)
  }, [user])

  return (
    <Card className="!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] p-[16px] py-[12px] mb-6">
      <Title order={3} className="mb-4">
        Actions
      </Title>
      <div className="flex justify-start gap-x-4 items-center">
        {isLoading ? (
          <Loader />
        ) : !friends.some((friend) => friend.id === user.id) ? (
          <>
            <Button
              leftSection={<UserPlus size={20} />}
              className="text-[16px] font-sans rounded-lg"
              color={'#ffd37d'}
              variant={'outline'}
              onClick={() =>
                sendFriendRequest(user.id, user.name, user.surname)
              }
            >
              Send Friend Request
            </Button>
          </>
        ) : (
          <>
            <Button
              className="text-[16px] font-sans rounded-lg"
              color={'#fa8072'}
              variant={'outline'}
              leftSection={<UserMinus size={20} />}
              onClick={() => setIsDeleteFriendModalOpened(true)}
            >
              Delete Friend
            </Button>
            <ModalDeleteUi
              opened={isDeleteFriendModalOpened}
              onClose={() => setIsDeleteFriendModalOpened(false)}
              onSubmit={() => deleteFriend(user.id)}
              title={'Delete Friend'}
              entity={'friend'}
            />
            <Button
              className="text-[16px] font-sans rounded-lg"
              color={'#ffd37d'}
              variant={'outline'}
              leftSection={<MessageSquare size={20} />}
              onClick={handleWriteMessage}
            >
              Write a message
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
