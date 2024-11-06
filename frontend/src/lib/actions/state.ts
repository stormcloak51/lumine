'use client';
import { useUser } from '../store/user.slice'
import { IUserCredentials } from '@/types/user.types'
import { emptyUser } from '@/config/constants/user.constant'



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

// export const getAccessTokenServer = () => {
// 	return getCookie('access_token')
// }