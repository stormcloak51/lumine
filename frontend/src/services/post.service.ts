import { axiosWithAuth } from '@/api/interceptors'
import { IPostData, TPost } from '@/types/post.types'
import { IUserCredentials } from '@/types/user.types'
import { AxiosResponse } from 'axios'



class PostService {
	private BASE_URL = '/posts'

	async findAll(): Promise<TPost[]> {
		const response: AxiosResponse<TPost[]> = await axiosWithAuth.get(this.BASE_URL)

		return JSON.parse(JSON.stringify(response.data))
	}

	async findSortedByLikes(): Promise<TPost[]> {
		const response: AxiosResponse<TPost[]> = await axiosWithAuth.get(this.BASE_URL + '/sortedByLikes')

		return JSON.parse(JSON.stringify(response.data))
	}

	async findByUsername(username: string){
		const response = await axiosWithAuth.get(this.BASE_URL + `/findByUsername?username=${username}`)

		return JSON.parse(JSON.stringify(response.data))
	}

	async create(data: IPostData){
		const response = await axiosWithAuth.post(this.BASE_URL + '/create', data)
		console.log(response.data, 'RESPONSE')
		return JSON.parse(JSON.stringify(response.data))
	}

	async like(data: {postId: TPost['id'], user: IUserCredentials}) {
		const response = await axiosWithAuth.post(this.BASE_URL + '/like', data)
		return JSON.parse(JSON.stringify(response.data))
	}

}

export const postService = new PostService()