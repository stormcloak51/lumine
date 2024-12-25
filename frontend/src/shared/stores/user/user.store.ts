import { IUser } from '@/shared/config/types/user.types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SliceProps {
  user: IUser | null
  setUser: (user: Partial<IUser>) => void
  deleteUser: () => void
}

export const useUser = create<SliceProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: Partial<IUser>) =>
        set((prev) => ({
          user: prev.user ? { ...prev.user, ...user } : (user as IUser),
        })),
      deleteUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
)
