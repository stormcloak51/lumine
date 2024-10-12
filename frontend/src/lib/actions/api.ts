import { TUser, TUserData, TUserLogin, TUserProfile } from '../types'
import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:1488/api/',
	withCredentials: true,
})

export const signUp = async (user: TUser): Promise<TUserData> => {
	const data = await api.post('auth/signup', user)
	return data.data
}

export const signIn = async (user: TUserLogin): Promise<TUserData> => {
	const data = await api.post('auth/login', user)
	return data.data
}

export const getUser = async (usernameOrEmailOrId: string): Promise<TUser | undefined> => {
	try {
		const data = await api.get(`user/${usernameOrEmailOrId}`)
		return data.data
	} catch (err) {
		console.log(err, 'errororororo')
	}
}

export const getAllUsers = async (): Promise<TUser[] | undefined> => {
	try {
		const data = await api.get('user/all')
		return data.data
	} catch (err) {
		console.log(err)
	}
}

export const isAuthenticated = async (access_token: string): Promise<boolean> => {
	try {
		const data = await api.get('auth/isAuthenticated', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		console.log(data)
		return !!data.data
	} catch (err) {
		console.log(err)
		return false
	}
}
