import { useFriendship } from '@/shared/hooks/useFriendship'
import { useFriendshipStore } from '@/shared/stores/friendship/friendship.store'
import { notifications } from '@mantine/notifications'
import { useState, useCallback } from 'react'
import { Check } from 'lucide-react'

export const useFriendRequestsOperations = () => {
  const { acceptFriendRequest, declineFriendRequest } = useFriendship()
  const { requests, removeRequest } = useFriendshipStore()
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set())

  const handleAcceptRequest = useCallback(async (request: any) => {
    setAnimatingIds((prev) => new Set(prev).add(request.id))
    
    try {
      // Pass request.id instead of request.senderId
      await acceptFriendRequest(request.id)

      // Use setTimeout to ensure DOM updates happen after the animation
      setTimeout(() => {
        setAnimatingIds((prev) => {
          const newSet = new Set(prev)
          newSet.delete(request.id)
          return newSet
        })
        // Move this outside of setState to avoid updating during render
        removeRequest(request.id)
      }, 500) // Match this with your animation duration

      notifications.show({
        title: 'Friend Request Accepted',
        message: `You are now friends with ${request.sender.name} ${request.sender.surname}`,
        color: 'yellow',
        icon: <Check size={16} />,
      })
    } catch (error) {
      setAnimatingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(request.id)
        return newSet
      })
      console.error(error)
      notifications.show({
        title: 'Error',
        message: 'Failed to accept friend request',
        color: 'red',
      })
    }
  }, [acceptFriendRequest, removeRequest])

  const handleDeclineRequest = useCallback(async (request: any) => {
    setAnimatingIds((prev) => new Set(prev).add(request.id))

    try {
      // Pass request.id instead of request.senderId
      await declineFriendRequest(request.id)

      setTimeout(() => {
        setAnimatingIds((prev) => {
          const newSet = new Set(prev)
          newSet.delete(request.id)
          return newSet
        })
        // Move this outside of setState to avoid updating during render
        removeRequest(request.id)
      }, 500)

      notifications.show({
        title: 'Friend Request Declined',
        message: `You declined ${request.sender.name} ${request.sender.surname}'s friend request`,
        color: 'yellow',
        icon: <Check size={16} />,
      })
    } catch (error) {
      setAnimatingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(request.id)
        return newSet
      })
      console.error(error)
      notifications.show({
        title: 'Error',
        message: 'Failed to decline friend request',
        color: 'red',
      })
    }
  }, [declineFriendRequest, removeRequest])

  return {
    requests,
    animatingIds,
    handleAcceptRequest,
    handleDeclineRequest,
  }
}