import { TUser, TUserData, TUserLogin } from '../types'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:1488/api/',
})

export const signUp = async (user: TUser): Promise<TUserData> => {
	const data = await api.post('auth/signup', user)
	return data.data
}

export const signIn = async (user: TUserLogin): Promise<TUserData> => {
	const data = await api.post('auth/login', user)
	return data.data
}

export const getUser = async (usernameOrEmailOrId: string) => {
	const data = await api.get(`user/${usernameOrEmailOrId}`, {
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_PUBLIC_JWT_SECRET}`
		}
	})
	return data
}

export const isAuthenticated = async (access_token: string): Promise<boolean> => {
	try {
		const data = await api.get('auth/isAuthenticated', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		})
		console.log(data)
		return !!data.data
	} catch (err) {
		console.log(err)
		return false
	}
}