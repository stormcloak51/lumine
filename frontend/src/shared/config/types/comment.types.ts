import { IUserCredentials } from './user.types'

// =================================COMMENTS=================================

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
	likes: number
	created_at: Date
	updated_at: Date
	subComments?: TCommentResponse[]
	parrentId?: number
}

export type TCommentLike = {
	commentId: number
	postId: number
	userId: string
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

// =================================SUBCOMMENTS=================================

export type TSubComment = {
	userId: string
	commentId: number
	postId: number
	content: string
}

//  =================================GENERAL=================================
export enum CommentRoles { 
	SUBCOMMENT = 'subcomment',
	MAINCOMMENT = 'maincomment',
}