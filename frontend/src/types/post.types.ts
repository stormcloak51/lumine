import { TCommentResponse } from './comment.types'
import { IUserCredentials } from './user.types'

export interface IPostData {
	content: string
	User: IUserCredentials
}

export type TPostLikes = {
	userId: string
	postId: number
}
export type TPost = {
	id: number
	content: string
	created_at: string
	updated_at: string
	User: IUserCredentials
	UserLike: TPostLikes[]
	Comment: TCommentResponse[]
}
