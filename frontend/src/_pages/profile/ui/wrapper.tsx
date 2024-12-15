'use client'

import {PostCreate} from '@/features/post/create'
import { ActionsSection } from './actions-section'
import { useAuth } from '@/shared/lib/useAuth'
import { Grid } from '@mantine/core'
import { PostList } from '@/entities/post/'
import { TPost } from '@/shared/config/types/post.types'

interface props {
	data: TPost[]
}

export const Wrapper = ({ data }: props) => {
	const { user } = useAuth()

	console.log(data)
	return (
		<Grid.Col span={7.5} className='pt-4'>
			{
				user.id !== data[0].User.id ? (
					<ActionsSection />
				) : (
					<PostCreate />
				)
			}
			<PostList initialData={data} feed={false} username={data[0].User.username}/>
		</Grid.Col>
	)
}
