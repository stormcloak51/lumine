import { axiosClassic, axiosWithAuth } from './interceptors'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { AxiosResponse } from 'axios'



export class UserApi {
	private BASE_URL = '/user'

	async getAllUsers(): Promise<IUserCredentials[]> {
		const response: AxiosResponse<IUserCredentials[]> = await axiosWithAuth.get(this.BASE_URL + '/all')
		return JSON.parse(JSON.stringify(response.data))
	}

	async getProfile(id: string): Promise<IUserCredentials> {
		const response: AxiosResponse<IUserCredentials> = await axiosWithAuth.get(this.BASE_URL + `/${id}`)
		console.log(response, 'response')
		return JSON.parse(JSON.stringify(response.data))
	}
	
	async update({id, dto}: {id: string, dto: Partial<IUserCredentials>}) {
		console.log(dto)
		const response: AxiosResponse<IUserCredentials> = await axiosWithAuth.patch(this.BASE_URL + `/${id}`, dto)
		return JSON.parse(JSON.stringify(response.data))
	}
}

export const userApi = new UserApi()