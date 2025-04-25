'use client'

import { FriendshipService } from '@/shared/api/friendship.service'
import { useFriendshipStore } from '@/shared/stores/friendship/friendship.store'
import { useCallback, useEffect, useRef } from 'react'

export const useFriendsActions = () => {
  const { friends, setFriends, removeFriend, isLoading, setIsLoading } =
    useFriendshipStore()
  const hasRequestBeenMade = useRef(false)
  const getFriends = useCallback(async () => {
    try {
      if (isLoading || hasRequestBeenMade.current) return
      
			hasRequestBeenMade.current = true
      setIsLoading(true)
      const response = await FriendshipService.getFriends()
      setFriends(response)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [setFriends, setIsLoading, isLoading])

  const deleteFriend = useCallback(
    async (friendId: string) => {
      try {
        await FriendshipService.deleteFriend(friendId)
        removeFriend(friendId)
      } catch (err) {
        console.error('something went wrong', err)
      }
    },
    [removeFriend]
  )

  useEffect(() => {
    if (friends.length === 0 && !isLoading) {
      getFriends()
    }
  }, [friends.length, isLoading, getFriends])

  return { friends, deleteFriend, length: friends.length, isLoading }
}
