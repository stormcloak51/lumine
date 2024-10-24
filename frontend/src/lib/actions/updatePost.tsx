'use server';

import { postService } from '@/services/post.service'
import { TPost } from '@/types/post.types'
import { IUserCredentials } from '@/types/user.types'
import { revalidateTag } from 'next/cache'


export const updatePost = async (data: {postId: TPost['id'], user: IUserCredentials}) => {
	try {
		const result = await postService.like(data)
		revalidateTag('posts')
		return result.data

	} catch(err: unknown) {
		return {error: err}
	}


}