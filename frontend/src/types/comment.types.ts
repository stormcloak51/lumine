import { IUserCredentials } from './user.types'



export type TComment = {
	postId: number
	userId: string
	content: string
}

export type TCommentLikes = {
	userId: string
	commentId: number
}

export type TCommentResponse = {
	id: number
	content: string
	postId: number
	userId: string
	user: IUserCredentials
	// UserLike: TCommentLikes[]
	Like: TCommentLikes[]
}

export type TCommentDelete = {
	commentId: number
	postId: number
}

export type TCommentEdit = {
	commentId: number
	postId: number
	content: string
}