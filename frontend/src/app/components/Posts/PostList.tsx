'use client'
import purify from 'dompurify'
import { TPost } from '@/types/post.types'
import { Card, Flex, Grid, Group, Text } from '@mantine/core'
import { FC } from 'react'
import LumineAvatar from '../LumineAvatar'
import { PostItem } from './PostItem'

interface IPostList {
	// queryKey?: string
	title: string
	posts?: TPost[]
	isGrid?: boolean
}

const PostList: FC<IPostList> = ({ title = 'Posts', posts, isGrid = false }) => {
	console.log(posts)
	if (isGrid) {
		return (
			<Grid.Col span={7.5} className='mt-3'>
				<Flex direction={'column'} className='gap-y-4'>
					{posts?.map(post => {
						return <PostItem {...post} title={title} />
					})}
				</Flex>
			</Grid.Col>
		)
	}
	return (
		<Flex direction={'column'} className='gap-y-4'>
			{posts?.map((post, index) => {
				return <PostItem {...post} title={title} />
			})}
		</Flex>
	)
}

export default PostList
