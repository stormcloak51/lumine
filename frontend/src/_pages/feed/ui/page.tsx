import { Container } from '@mantine/core'

import { PostCreate } from '@/features/post/create'
import { PostList } from '@/entities/post/index'
import { Metadata } from 'next'
import { postApi } from '@/shared/api/postApi'
import { Suspense } from 'react'
import { TPost } from '@/shared/config/types/post.types'
import DOMPurify from "isomorphic-dompurify";
import Loading from './loading'
export const metadata: Metadata = {
	title: 'Lumine - Discover',
	description: 'Discover the latest news!',
}

const santizePosts = (posts: any) => {
	return {
		...posts,
		data: posts.data.map((post: TPost) => {
			return {
				...post,
				content: DOMPurify.sanitize(post.content)
			}
		})
	}
}

export const Feed = async () => {
	const posts = await postApi.findAllSortedByDate(1, 10)
	console.log(posts)
	const sanitizedPosts = santizePosts(posts)
	return (
		<Container p={0} className='box-border flex flex-col'>
			<PostCreate />
			<Suspense fallback={<Loading />}>
				<PostList initialData={sanitizedPosts} feed={true} title='Recommended' />
			</Suspense>
		</Container>
	)
}
