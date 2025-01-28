import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'

import { FriendshipService } from '../api/friendship.service'
import { getSocket } from '../api/socket.service'
import { useFriendshipStore } from '../stores/friendship/friendship.store'
import { useAuth } from '../stores/user/useAuth'

export const useFriendship = () => {
  const friendshipStore = useFriendshipStore()
  const {
    user: { id },
  } = useAuth()

  const acceptFriendRequest = async (requestId: string) => {
    const socket = getSocket(id)
    socket?.emit('acceptFriendRequest', { requestId })

    // Слушаем ответ от сервера
    socket?.on('friendRequestAccepted', (data) => {
      // Обновляем состояние store
      console.log(data)
      friendshipStore.removeRequest(requestId)
      // friendshipStore.addFriend(data.friendship.user2)
    })

    socket?.on('friendRequestError', (error) => {
      console.error(error)
    })

    // Таймаут на случай если ответ не придет
  }

  useEffect(() => {
    const socket = getSocket(id)

    const getRequests = async () => {
      friendshipStore.setRequests(await FriendshipService.getFriendRequests())
    }

    getRequests()

    socket?.on('friendRequest', (data) => {
      if (data.type === 'RECEIVED') {
        friendshipStore.addRequest(data.request)
        notifications.show({
          title: 'New Friend Request',
          message: `${data.request.sender.name} ${data.request.sender.surname} wants to be your friend`,
          color: 'yellow',
        })
      }
    })

    return () => {
      socket?.off('friendRequest')
    }
  }, [id])

  return { requests: friendshipStore.requests, acceptFriendRequest }
}
