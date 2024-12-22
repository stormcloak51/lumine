import { create } from 'zustand'
import { IUser } from '@/shared/config/types/user.types'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SliceProps {
	user: IUser | null
	setUser: (user: IUser) => void
	deleteUser: () => void
}

export const useUser = create<SliceProps>()(
	persist(
		set => ({
			user: null,
			setUser: (user: IUser) => set({ user }),
			deleteUser: () => set({ user: null }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({ user: state.user }),
		}
	)
)
