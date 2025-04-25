import { IUser } from '@/shared/config/types/user.types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SliceProps {
  user: IUser | null
  hydrated: boolean
  setUser: (user: Partial<IUser>) => void
  deleteUser: () => void
  removeUserFriend: (friendId: string) => void
  setHydrated: (state: boolean) => void
}

export const useUser = create<SliceProps>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user: Partial<IUser>) =>
        set((prev) => ({
          user: prev.user ? { ...prev.user, ...user } : (user as IUser),
        })),
      removeUserFriend: (friendId: string) =>
        set((prev) => ({
          user: prev.user
            ? {
                ...prev.user,
                friends: prev.user.friends.filter(
                  (friend) => friend.friendId !== friendId
                ),
              }
            : null,
        })),
      deleteUser: () => set({ user: null }),
      setHydrated: (state: boolean) => set({ hydrated: state }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true)
        }
      },
    }
  )
)
