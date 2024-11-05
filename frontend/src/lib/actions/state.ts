'use client';
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getCookie } from 'cookies-next'
import { useUser } from '../store/user.slice'
import { IUserCredentials } from '@/types/user.types'



export const useAuth = (): { isAuth: boolean; user: IUserCredentials } => {
	const data = useUser((state) => state.user)

	if (!data) {
		return {
			isAuth: false,
			user: {}
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