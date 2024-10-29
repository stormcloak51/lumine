'use client'
import { postService } from '@/services/post.service'
import { TPost } from '@/types/post.types'
import { IUserCredentials } from '@/types/user.types'

export const likePost = async (data: {postId: TPost['id'], user: IUserCredentials}) => {
	try {
		await postService.like(data)
		// revalidateTag('posts')
		// return result.data

	} catch(err: unknown) {
		return {error: err}
	}
}

export const unlikePost = async (data: {postId: TPost['id'], user: IUserCredentials}) => {
	try {
		await postService.unlike(data)
		// revalidateTag('posts')
		// return true
	} catch (err: unknown) {
		return {error: err}
	}
}

export const deletePost = async (id: number) => {
	try {
		await postService.delete(id)
	} catch (err: unknown) {
		console.log({error: err})
	}
}

export const editPost = async (data: {id: number, content: string}) => {
	try {
		return await postService.edit(data.id, data.content)
		// revalidateTag('posts')
	} catch (err: unknown) {
		console.log({error: err})
	}
}