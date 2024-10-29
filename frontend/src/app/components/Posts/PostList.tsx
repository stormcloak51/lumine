'use client'
import { TPost } from '@/types/post.types'
import { Flex} from '@mantine/core'
import { FC } from 'react'
import { PostItem } from './PostItem'

export interface IPostList {
	// queryKey?: string
	title: string
	posts?: TPost[]
	isGrid?: boolean
	lastPostRef?: React.Ref<HTMLDivElement>
}

const PostList: FC<IPostList> = ({ title = 'Posts', posts, lastPostRef, isGrid = false }) => {
	if (isGrid) {
		return (
			// <Grid.Col span={7.5} className='mt-3'>
				<Flex direction={'column'} className='gap-y-4'>
					{posts?.map((post, index) => {
						return <PostItem key={post.id} {...post} title={title} />
					})}
				</Flex>
		)
	}
	return (
		<Flex direction={'column'} className='gap-y-4'>
			{posts?.map((post, index) => {
				const isLastPost = posts.length - 1 === index
				return <PostItem lastPostRef={isLastPost ? lastPostRef : undefined} key={post.id} {...post} title={title} />
			})}
		</Flex>
	)
}

export default PostList
