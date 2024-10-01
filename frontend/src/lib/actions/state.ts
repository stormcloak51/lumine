'use client';
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'



export const useAuth = () => {
	const data = useSelector((state: RootState) => state.user)
	const {access_token, ...userData} = data

	return {
		isAuth: !!access_token,
		user: userData
	}
}