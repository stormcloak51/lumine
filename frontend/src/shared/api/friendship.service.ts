import { Socket } from 'socket.io-client'

import { IUser } from '../config/types/user.types'
import { IFriend, IFriendRequest, IFriendship } from '../config/types/friend.types'
import { api } from './base'

export class FriendshipService {
  constructor(private readonly socket: Socket) {}

  static async getFriendRequests() {
    try {
      const response = await api.get<IFriendRequest[]>(
        'friendship/friend-requests'
      )
      return response
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getFriendships() {
    try {
      const response = await api.get<IFriendship[]>('friendship/friendships')
      return response
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getFriends() {
    try {
      const response = await api.get<IUser[]>('friendship/friends')
      return response
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getFriendsByUsername(username: string) {
    try {
      const response = await api.get<IFriend[]>(`friendship/friends/${username}`)
      return response
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async deleteFriend(friendId: string) {
    try {
      const response = await api.delete(`friendship/friend/${friendId}`)

      return response
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  sendFriendRequest(receiverId: string) {
    return new Promise((resolve, reject) => {
      this.socket.emit('sendFriendRequest', { receiverId }, (response: any) => {
        if (response.success) {
          resolve(response.request)
        } else {
          reject(response.error)
        }
      })
    })
  }

  respondToFriendRequest(requestId: string, accept: boolean) {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'respondToFriendRequest',
        { requestId, accept },
        (response: any) => {
          if (response.success) {
            resolve(response)
          } else {
            reject(response.error)
          }
        }
      )
    })
  }

  removeFriendRequest(friendId: string) {
    return new Promise((resolve, reject) => {
      this.socket.emit('removeFriend', { friendId }, (response: any) => {
        if (response.success) {
          resolve(response)
        } else {
          reject(response.error)
        }
      })
    })
  }
}
// we dont import instance, because the socket is located around the app
