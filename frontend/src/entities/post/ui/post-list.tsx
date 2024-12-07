'use client'
import Loading from '@/_pages/feed/ui/loading'
import { Flex } from '@mantine/core'
import { FC } from 'react'
import { usePostList } from '../model/usePostList'
import { PostItem } from './post-item'

export interface IPostList {
	feed: boolean
	title: string
	username?: string
}

export const PostList: FC<IPostList> = ({
	username,
	feed,
	title = 'Posts',
}) => {
	const { isLoading, allPosts, lastPostRef } = usePostList({ feed, username })
	return !isLoading ? (
		<Flex direction={'column'} className='gap-y-4'>
			{allPosts?.map((post, index) => {
				const isLastPost = allPosts.length - 1 === index
				return (
					<PostItem
						lastPostRef={isLastPost ? lastPostRef : undefined}
						key={post.id}
						{...post}
						title={title}
					/>
				)
			})}
		</Flex>
	) : (
		<Loading />
	)
}
