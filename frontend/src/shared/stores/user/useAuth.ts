'use client'
import { emptyUser } from '@/shared/config/constants/user.constants'
import { IUser } from '@/shared/config/types/user.types'
import { useUser } from '@/shared/stores/user/user.store'

export const useAuth = (): { isAuth: boolean; user: IUser } => {
	const data = useUser(state => state.user)

	if (!data) {
		return {
			isAuth: false,
			user: emptyUser,
		}
	}

	return {
		isAuth: true,
		user: data,
	}
}
