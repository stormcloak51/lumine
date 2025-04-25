import { Socket, io } from 'socket.io-client'

// Socket instances cache
const socketInstances: Record<string, Socket> = {}

/**
 * Get or create a socket instance for a namespace
 * @param userId User ID for authentication
 * @param namespace Socket namespace (e.g., 'chat')
 * @returns Socket instance
 */
export const getSocket = (userId: string, namespace: string): Socket => {
  const key = `${namespace}:${userId}`

  if (!socketInstances[key] || !socketInstances[key].connected) {
    const socket = io(`http://localhost:1488/${namespace}`, {
      withCredentials: true,
      transports: ['websocket'],
      query: { userId },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Add connection status logging
    socket.on('connect', () => {
      console.log(`Socket connected to ${namespace} with userId:`, userId)

      // When connected, join the user's individual room using their userId
      // This is crucial for receiving direct messages from the server
      socket.emit('joinUserRoom', { userId }, (response: any) => {
        if (response && response.success) {
          console.log(`Joined personal user room: ${userId}`)
        } else {
          console.error(
            `Failed to join personal user room: ${userId}`,
            response?.error || 'Unknown error'
          )
        }
      })
    })

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected from ${namespace}:`, reason)
    })

    socket.on('connect_error', (error) => {
      console.error(`Socket connection error for ${namespace}:`, error)
    })

    // Add promise-based event emitter
    socket.emitWithAck = <T>(event: string, data: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        socket
          .timeout(5000)
          .emit(event, data, (err: Error | null, response: T) => {
            if (err) {
              reject(err)
            } else {
              resolve(response)
            }
          })
      })
    }

    socketInstances[key] = socket
  }

  return socketInstances[key]
}

/**
 * Disconnect all socket instances
 */
export const disconnectAllSockets = () => {
  Object.values(socketInstances).forEach((socket) => {
    if (socket.connected) {
      socket.disconnect()
    }
  })
}

// Extend Socket interface with our custom methods
declare module 'socket.io-client' {
  interface Socket {
    emitWithAck<T>(event: string, data: any): Promise<T>
  }
}
