'use client'

import { PostList } from '@/entities/post/'
import { PostCreate } from '@/features/post/create'
import { TPost } from '@/shared/config/types/post.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Grid } from '@mantine/core'
import { ActionsSection } from './actions-section'

interface props {
	data: TPost[]
}

export const Wrapper = ({ data }: props) => {
	const { user } = useAuth()

	console.log(data)
	return (
		<Grid.Col span={7.5} className='pt-4'>
			{user.id !== data[0].User.id ? <ActionsSection /> : <PostCreate />}
			<PostList
				initialData={data}
				feed={false}
				username={data[0].User.username}
			/>
		</Grid.Col>
	)
}
