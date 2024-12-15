'use client'
import Loading from '@/_pages/feed/ui/loading'
import { Flex } from '@mantine/core'
import { FC } from 'react'
import { usePostList } from '../model/usePostList'
import { PostItem } from './post-item'
import { TPost } from '@/shared/config/types/post.types'

export interface IPostList {
	feed: boolean
	username?: string
	initialData: any
}

export const PostList: FC<IPostList> = ({
	username,
	feed,
	initialData,
}) => {
	const { isLoading, allPosts, lastPostRef } = usePostList({
		feed,
		username,
		initialData,
	})

	return (
		<Flex direction={'column'} className='gap-y-4'>
			{allPosts?.map((postPage, index) => {
				return postPage.data.map((post, index) => {
					const isLastPost = postPage.data.length - 1 === index
					return (
						<PostItem
							lastPostRef={isLastPost ? lastPostRef : undefined}
							key={post.id}
							{...post}
						/>
					)
				})
			})}
		</Flex>
	)
}
