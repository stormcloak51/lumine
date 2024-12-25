'use client'
import { Flex } from '@mantine/core'
import { FC } from 'react'
import { PostItem } from './post-item'
import { usePostList } from '../model/usePostList'

export interface IPostList {
	feed: boolean
	username?: string
}

export const PostList: FC<IPostList> = ({
	feed,
	username
}) => {

	const { isLoading, allPosts, lastPostRef } = usePostList({
    feed,
    username,
  })

	// if (isLoading) return <Loading />
	return (
		<Flex direction={'column'} className='gap-y-4'>
			{allPosts && allPosts.map((postPage, index) => {
				return postPage?.data?.map((post, index) => {
					const isLastPost = postPage?.data && postPage?.data?.length - 1 === index
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
