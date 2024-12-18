import { axiosWithAuth } from './interceptors'
import { TComment, TCommentDelete, TCommentEdit, TCommentLike, TCommentResponse, TSubComment } from '@/shared/config/types/comment.types'
import { AxiosResponse } from 'axios'



export class CommentApi {
	private BASE_URL = '/comment'

	async getById(postId: number, page: number) {
		const response = await axiosWithAuth.get(this.BASE_URL + `/getById?postId=${postId}&page=${page}`)
		return {
			data: JSON.parse(JSON.stringify(response.data.data)),
			total: JSON.parse(JSON.stringify(response.data.total)),
		}
	}

	async create(data: TComment){
		const response: AxiosResponse<TCommentResponse> = await axiosWithAuth.post(this.BASE_URL + '/create', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	async like(data: TCommentLike) {
		const response: AxiosResponse<TCommentResponse> = await axiosWithAuth.post(this.BASE_URL + '/like', data)

		return JSON.parse(JSON.stringify(response.data))
	}

	async delete(data: TCommentDelete){
		const response: AxiosResponse<boolean> = await axiosWithAuth.patch(this.BASE_URL + '/delete', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	async edit(data: TCommentEdit) {
		const response: AxiosResponse<TCommentEdit> = await axiosWithAuth.patch(this.BASE_URL + '/edit', data)
		return JSON.parse(JSON.stringify(response.data))
	}

	// ==================== SUBCOMMENTS ===================

	async getSubcomments({postId, commentId, page}: {postId: number, commentId: number, page: number}){
		const response = await axiosWithAuth.get(this.BASE_URL + `/getSubcomments?postId=${postId}&commentId=${commentId}&page=${page}`)

		return {
			data: JSON.parse(JSON.stringify(response.data.data)),
			total: JSON.parse(JSON.stringify(response.data.total)),
		}
	}

	async createSubcomment(data: Partial<TSubComment>){
		const response: AxiosResponse<TCommentResponse> = await axiosWithAuth.post(this.BASE_URL + '/createSubcomment', data)
		return JSON.parse(JSON.stringify(response.data))
	}
}

export const commentApi = new CommentApi()