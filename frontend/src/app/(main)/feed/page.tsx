import { Container } from '@mantine/core'

import { PostCreate } from '@/components/Posts/PostCreate'
import PostList from '@/components/Posts/PostList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Lumine - Discover',
	description: 'Discover the latest news!',
}

export default function Feed() {
	return (
		<Container p={0} className='box-border flex flex-col'>
			<PostCreate />
			<PostList feed={true} title='Recommended' />
		</Container>
	)
}
