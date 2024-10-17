import { Container } from '@mantine/core'
import { NextPage } from 'next'

import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'
import { postService } from '@/services/post.service'

// import { useQueryClient } from '@tanstack/react-query'

const Feed: NextPage = async ({}) => {
	const posts = await postService.findAll()
	return (
		<Container className='box-border flex flex-col'>
			<PostCreate isGrid={false} />

			<PostList posts={posts} title='Recommended Posts' />
		</Container>
	)
}

export default Feed
