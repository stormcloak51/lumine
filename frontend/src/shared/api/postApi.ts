import { axiosWithAuth } from './interceptors'
import { IPostData, TPost } from '@/shared/config/types/post.types'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { AxiosResponse } from 'axios'



class PostApi {
	private BASE_URL = '/posts'

	async findAll(): Promise<TPost[]> {
		const response: AxiosResponse<TPost[]> = await axiosWithAuth.get(this.BASE_URL)

		return JSON.parse(JSON.stringify(response.data))
	}

	async findSortedByLikes(page: number = 1, limit: number = 10): Promise<TPost[]> {
		const response: AxiosResponse<TPost[]> = await axiosWithAuth.get(this.BASE_URL + `/sortedByLikes?page=${page}&limit=${limit}`)
		return JSON.parse(JSON.stringify(response.data))
	}

	async findAllSortedByDate(page: number = 1, limit: number = 10): Promise<TPost[]> {
		const response: AxiosResponse<TPost[]> = await axiosWithAuth.get(this.BASE_URL + `/sortedByDate?page=${page}&limit=${limit}`)
		return JSON.parse(JSON.stringify(response.data))
	}

	async findByUsername(username: string, page: number = 1, limit: number = 10) {
		try {
			const response = await axiosWithAuth.get(this.BASE_URL + `/findByUsername?username=${username}&page=${page}&limit=${limit}`)
			return JSON.parse(JSON.stringify(response.data))
		} catch (error) {
			console.log(error)
		}
	}

	async create(data: IPostData){
		const response = await axiosWithAuth.post(this.BASE_URL + '/create', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	async like(data: {postId: TPost['id'], user: IUserCredentials}) {
		const response = await axiosWithAuth.patch(this.BASE_URL + '/like', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	async unlike(data: {postId: TPost['id'], user: IUserCredentials}) {
		const response = await axiosWithAuth.patch(this.BASE_URL + '/unlike', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	async delete(data: {postId: number, userId: string}) {
		try {
			const response = await axiosWithAuth.delete(this.BASE_URL + `/delete`, {data})
			return JSON.parse(JSON.stringify(response.data))
		} catch (error) {
			console.log(error)
		}
	}
	async edit(data: {postId: number, userId: string, content: string}) {
		try {
			const response = await axiosWithAuth.patch(this.BASE_URL + `/edit`, {data})
			return JSON.parse(JSON.stringify(response.data))
		} catch (error) {
			console.log(error)
		}
	}
}

export const postApi = new PostApi()