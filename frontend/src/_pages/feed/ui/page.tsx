import { Container } from '@mantine/core'

import { PostCreate } from '@/features/post/create'
import { PostList } from '@/entities/post/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Lumine - Discover',
	description: 'Discover the latest news!',
}

export const Feed = () => {
	return (
		<Container p={0} className='box-border flex flex-col'>
			<PostCreate />
			<PostList feed={true} title='Recommended' />
		</Container>
	)
}
