import { TCommentResponse } from './comment.types'
import { IAsset } from './general.types'
import { IUser } from './user.types'

export interface ICreatePost {
	content: string
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
	User: IUser
	Like: TPostLikes[]
	Comment: TCommentResponse[]
	likes: number
}

export interface IPostDraft {
	content: string | null
	media: IAsset[] | null
}
