// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
// import Cookies from 'js-cookie'
// import { TUser, TUserData, TUserLogin } from '../types'

// export const api = axios.create({
// 	baseURL: 'http://localhost:1488/api/',
// 	withCredentials: true,
// })

// api.interceptors.request.use(
// 	(config: InternalAxiosRequestConfig) => {
// 		const token = Cookies.get('access_token')
// 		if (token) {
// 			config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
// 			console.log(config.headers)
// 		}
// 		return config
// 	},
// 	error => Promise.reject(error),
// )

// api.interceptors.response.use(
// 	response => response,
// 	async (error: AxiosError) => {
// 		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			try {
// 				const newToken = await refreshToken()
// 				alert(newToken)
// 				originalRequest.headers['Authorization'] = `Bearer ${JSON.stringify(newToken)}`
// 				return api(originalRequest)
// 			} catch (refreshError) {
// 				Cookies.remove('access_token')
// 				return Promise.reject(refreshError)
// 			}
// 		}
// 		return Promise.reject(error)
// 	},
// )

// const refreshToken = async () => {
// 	try {
// 		const response = await api.post('auth/refresh')
// 		const { access_token } = response.data
// 		Cookies.set('access_token', access_token)
// 		return access_token
// 	} catch (error) {
// 		throw error
// 	}
// }

// export const signUp = async (user: TUser): Promise<TUserData> => {
// 	const response = await api.post('auth/signup', user)
// 	const { access_token, ...userWithoutSensetiveData } = response.data
// 	Cookies.set('access_token', access_token)
// 	alert(Cookies.get('access_token'))
// 	return userWithoutSensetiveData
// }

// export const signIn = async (user: TUserLogin): Promise<TUserData> => {
// 	const response = await api.post('auth/login', user)
// 	const { access_token, ...userWithoutSensetiveData } = response.data
// 	Cookies.set('access_token', access_token)
// 	return userWithoutSensetiveData
// }

// export const logOut = async (userId: string) => {
// 	try {
// 		await api.post('auth/logout', {
// 			user: {
// 				sub: userId,
// 			},
// 		})
// 		Cookies.remove('access_token')
// 	} catch (err) {
// 		console.log('Logout failed:', err)
// 	}
// }

// export const getUser = async (usernameOrEmailOrId: string): Promise<TUser | undefined> => {
// 	try {
// 		console.log(Cookies.get('access_token'))
// 		const data = await api.get(`user/${usernameOrEmailOrId}`)
// 		return data.data
// 	} catch (err) {
// 		console.log(err, 'errororororo')
// 	}
// }

// export const getAllUsers = async (): Promise<TUser[] | undefined> => {
// 	try {
// 		const data = await api.get('user/all')
// 		return data.data
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

// export async function isAuthenticated(): Promise<boolean> {
// 	try {
// 		const response = await api.get('auth/isauth')
// 		console.log(response, 'RESPAPKFPDSPAL')
// 		return response.data === true
// 	} catch (err) {
// 		console.error('Authentication check failed:', err)
// 		return false
// 	}
// }
