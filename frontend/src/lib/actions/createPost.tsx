'use server';

import { postService } from '@/services/post.service'
import { IPostData } from '@/types/post.types'
import { revalidateTag } from 'next/cache'



export const createPost = async ({content, User}: IPostData) => {
	console.log(1123)
	try {
		const result = await postService.create({content, User})
		revalidateTag('posts')
		return result.data
	} catch(err) {
		console.error(err)
	}

	
}