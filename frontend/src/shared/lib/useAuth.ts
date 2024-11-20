'use client';
import { useUser } from '@/shared/stores/user.store'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { emptyUser } from '@/shared/config/constants/user.constants'



export const useAuth = (): { isAuth: boolean; user: IUserCredentials } => {
	const data = useUser((state) => state.user)

	if (!data) {
		return {
			isAuth: false,
			user: emptyUser
		}
	}

	const {access_token, ...userData} = data


	return {
		isAuth: !!access_token,
		user: userData.user
	}
}
