'use client'

import { notifications } from '@mantine/notifications'
import { useCallback, useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import { FriendshipService } from '../api/friendship.service'
import { getSocket } from '../api/socket.service'
import { useFriendshipStore } from '../stores/friendship/friendship.store'
import { useAuth } from '../stores/user/useAuth'

// Track if requests have been loaded globally
let requestsLoaded = false
// Keep a singleton socket reference
let globalSocket: Socket | null = null
// Track if event handlers are attached
let eventHandlersAttached = false

export const useFriendship = () => {
  const friendshipStore = useFriendshipStore()
  const { user } = useAuth()
  const socket = useRef<Socket | null>(null)

  // Initialize socket only once globally
  useEffect(() => {
    if (!globalSocket && user?.id) {
      globalSocket = getSocket(user.id, 'friendship')
    }

    socket.current = globalSocket

    // Load requests only once across the entire app
    if (!requestsLoaded && globalSocket) {
      const getRequests = async () => {
        try {
          const requests = await FriendshipService.getFriendRequests()
          friendshipStore.setRequests(requests)
          requestsLoaded = true
        } catch (error) {
          console.error('Error loading friend requests:', error)
        }
      }

      getRequests()
    }

    // Set up the friend request handler only once globally
    if (globalSocket && !eventHandlersAttached) {
      // Handle incoming friend requests - defined only once
      const handleFriendRequest = (data: any) => {
        if (data.type === 'RECEIVED') {
          console.log('Friend request received:', data)
          friendshipStore.addRequest(data.request)
          notifications.show({
            title: 'New Friend Request',
            message: `${data.request.sender.name} ${data.request.sender.surname} wants to be your friend`,
            color: 'yellow',
          })
        }
      }

      // Remove any existing listener first to avoid duplicates
      globalSocket.off('friendRequest', handleFriendRequest)
      // Use on instead of once since we want to handle multiple different requests
      globalSocket.on('friendRequest', handleFriendRequest)

      eventHandlersAttached = true

      console.log('Friend request event handler attached')
    }

    return () => {
      // We don't disconnect or clean up the globalSocket here
      // This is intentional to maintain the singleton connection
    }
  }, [user?.id, friendshipStore])

  const sendFriendRequest = useCallback(
    async (receiverId: string, name: string, surname: string) => {
      if (!socket.current) return Promise.reject('Socket not connected')

      const currentSocket = socket.current
      currentSocket.emit('sendFriendRequest', { receiverId })

      return new Promise<any>((resolve) => {
        const handleResponse = (data: any) => {
          console.log('Friend request response:', data)
          if (data.message === 'Successfully sent friend request') {
            notifications.show({
              title: 'Friend Request Sent',
              message: `Friend request sent to ${name} ${surname}`,
              color: 'yellow',
            })
            resolve(data)
            currentSocket.off('friendRequest', handleResponse)
          }
        }

        currentSocket.once('friendRequest', handleResponse)
      })
    },
    []
  )

  const cancelFriendRequest = useCallback(() => {
    socket.current?.emit('cancelFriendRequest', { receiverId: user.id })
  }, [user?.id])

  const acceptFriendRequest = useCallback(
    async (requestId: string) => {
      if (!socket.current) return Promise.reject('Socket not connected')

      const currentSocket = socket.current
      currentSocket.emit('acceptFriendRequest', { requestId })

      return new Promise<any>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          currentSocket.off('friendRequestAccepted')
          currentSocket.off('friendRequestError')
          reject(new Error('Friend request acceptance timed out'))
        }, 5000)

        currentSocket.once('friendRequestAccepted', (data: any) => {
          clearTimeout(timeoutId)
          friendshipStore.removeRequest(requestId)
          friendshipStore.addFriend(data.friendship.friend)
          resolve(data)
        })

        currentSocket.once('friendRequestError', (error: any) => {
          clearTimeout(timeoutId)
          reject(error)
        })
      })
    },
    [friendshipStore]
  )

  const declineFriendRequest = useCallback(
    async (requestId: string) => {
      if (!socket.current) return Promise.reject('Socket not connected')

      const currentSocket = socket.current
      currentSocket.emit('declineFriendRequest', { requestId })

      return new Promise<any>((resolve) => {
        const handleResponse = (data: any) => {
          if (data.message === 'Successfully declined friend request') {
            friendshipStore.removeRequest(requestId)
            resolve(data)
            currentSocket.off('friendRequest', handleResponse)
          }
        }

        currentSocket.once('friendRequest', handleResponse)
      })
    },
    [friendshipStore]
  )

  return {
    requests: friendshipStore.requests,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    cancelFriendRequest,
  }
}
