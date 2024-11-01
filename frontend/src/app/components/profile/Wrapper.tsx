'use client'

import {PostCreate} from '@/app/components/Posts/PostCreate'
import { ActionsSection } from '@/app/components/profile/ActionsSection'
import { useAuth } from '@/lib/actions/state'
import { Grid } from '@mantine/core'
import { FC } from 'react'
import PostList, { IPostList } from '../Posts/PostList'

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
			<PostCreate isGrid={true} />
			<PostList title={`${user?.name}'s Posts`} feed={false} username={username}/>
		</Grid.Col>
	)
}
