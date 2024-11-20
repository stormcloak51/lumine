'use client'

import {PostCreate} from '@/features/post/create'
import { ActionsSection } from './actions-section'
import { useAuth } from '@/shared/lib/useAuth'
import { Grid } from '@mantine/core'
import { FC } from 'react'
import { PostList, IPostList } from '@/entities/post/'

interface IWrapper {
	currId: string
	username: string
}

export const Wrapper: FC<IWrapper & Omit<IPostList, 'feed'>> = ({ username, currId, title = 'Posts' }) => {
	const { user } = useAuth()

	if (user.id !== currId) {
		return (
			<Grid.Col span={7.5} className='pt-4'>
				<ActionsSection />
				<PostList title={`${user?.name}'s Posts`} feed={false} username={username} />
			</Grid.Col>
		)
	}
	return (
		<Grid.Col span={7.5} className='pt-4'>
			<PostCreate />
			<PostList title={`${user?.name}'s Posts`} feed={false} username={username}/>
		</Grid.Col>
	)
}
