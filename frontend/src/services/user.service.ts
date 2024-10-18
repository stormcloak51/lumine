import { axiosWithAuth } from '@/api/interceptors'
import { IUserCredentials } from '@/types/user.types'
import { AxiosResponse } from 'axios'



export class UserService {
	private BASE_URL = '/user'

	async getAllUsers(): Promise<IUserCredentials[]> {
		const response: AxiosResponse<IUserCredentials[]> = await axiosWithAuth.get(this.BASE_URL + '/all')
		return JSON.parse(JSON.stringify(response.data))
	}

	async getProfile(id: string): Promise<IUserCredentials> {
		const response: AxiosResponse<IUserCredentials> = await axiosWithAuth.get(this.BASE_URL + `/${id}`)
		return JSON.parse(JSON.stringify(response.data))
	}
	
}

export const userService = new UserService()