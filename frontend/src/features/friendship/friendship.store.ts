import { IFriendRequest, IFriendship } from '@/shared/config/types/friend.types';
import { IUser } from '@/shared/config/types/user.types'
import { create } from 'zustand';

interface FriendshipStore {
  friends: IUser[];
  requests: IFriendRequest[];
  setFriends: (friends: IUser[]) => void;
  setRequests: (requests: IFriendRequest[]) => void;
  addFriend: (friend: IUser) => void;
  removeFriend: (friendId: string) => void;
  addRequest: (request: IFriendRequest) => void;
  updateRequest: (requestId: string, status: 'ACCEPTED' | 'DECLINED') => void;
}

export const useFriendshipStore = create<FriendshipStore>((set) => ({
  friends: [],
  requests: [],
  setFriends: (friends) => set({ friends }),
  setRequests: (requests) => set({ requests }),
  addFriend: (friendship) => 
    set((state) => ({ friends: [...state.friends, friendship] })),
  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),
  updateRequest: (requestId, status) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === requestId ? { ...r, status } : r
      ),
    })),
}));