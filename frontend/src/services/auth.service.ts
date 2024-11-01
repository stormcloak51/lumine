import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { removeFromStorage, saveToStorage } from './auth-token.service'
import { TUser, TUserData, TUserLogin } from '@/types/user.types'

export const authService = {

	async main(type: 'login' | 'register', data: TUserLogin | TUser) {
		const response = await axiosClassic.post(`/auth/${type}`, data)

		if (response.data.accessToken) saveToStorage(response.data.accessToken)

		return response.data as TUserData
	},

	async getNewTokens(){
		const response = await axiosClassic.post('/auth/login/access-token')

		console.log(response.data, 'RESPAPKFPDSPAL')

		if (response.data.accessToken) saveToStorage(response.data.accessToken)

		return response
	},

	async logout(){
		const response = await axiosClassic.post('/auth/logout')

		if (response.data) removeFromStorage()

		return response 
	}
}