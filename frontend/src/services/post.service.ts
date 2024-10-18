import { axiosWithAuth } from '@/api/interceptors'
import { IPostData } from '@/types/post.types'
import { AxiosResponse } from 'axios'



class PostService {
	private BASE_URL = '/posts'

	async findAll(){
		const response = await axiosWithAuth.get(this.BASE_URL)

		return JSON.parse(JSON.stringify(response.data))
	}

	async create(data: IPostData){
		const response = await axiosWithAuth.post(this.BASE_URL + '/create', data)
		console.log(response.data, 'RESPONSE')
		return JSON.parse(JSON.stringify(response.data))
	}

	async findByUsername(username: string){
		const response = await axiosWithAuth.get(this.BASE_URL + `/findByUsername?username=${username}`)

		return JSON.parse(JSON.stringify(response.data))
	}
}

export const postService = new PostService()