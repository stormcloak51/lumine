import type { IFriendRequest } from '@/shared/config/types/friend.types'
import type { IUser } from '@/shared/config/types/user.types'
import { create } from 'zustand'

interface FriendshipStore {
  friends: IUser[]
  requests: IFriendRequest[]
  setFriends: (friends: IUser[]) => void
  setRequests: (requests: IFriendRequest[]) => void
  addFriend: (friend: IUser) => void
  removeFriend: (friendId: string) => void
  addRequest: (request: IFriendRequest) => void
  removeRequest: (requestId: string) => void
}

export const useFriendshipStore = create<FriendshipStore>((set) => ({
  friends: [],
  requests: [],
  setFriends: (friends) => set({ friends }),
  setRequests: (requests) => set({ requests }),
  addFriend: (friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),
  removeRequest: (requestId) =>
    set((state) => ({
      requests: state.requests.filter((r) => r.id !== requestId),
    })),
}))
