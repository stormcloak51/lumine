'use server';

import { postService } from '@/services/post.service'
import { TPost } from '@/types/post.types'
import { IUserCredentials } from '@/types/user.types'
import { revalidateTag } from 'next/cache'


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