import { TCommentResponse } from './comment.types'
import { IAsset } from './general.types'
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
	Like: TPostLikes[]
	Comment: TCommentResponse[]
	likes: number
}

export interface IPostDraft {
	content: string | null
	media: IAsset[] | null
}
