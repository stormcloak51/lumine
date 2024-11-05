import {create} from 'zustand'
import { TUserData } from '@/types/user.types'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SliceProps {
	user: TUserData | null
	setUser: (user: TUserData) => void
	deleteUser: () => void
}

export const useUser = create<SliceProps>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user: TUserData) => set({ user }),
			deleteUser: () => set({ user: null }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ user: state.user }),
		}
	)
)