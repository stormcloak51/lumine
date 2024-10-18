import { Container } from '@mantine/core'
import { NextPage } from 'next'

import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'
import { postService } from '@/services/post.service'
import { TPost } from '@/types/post.types'

// import { useQueryClient } from '@tanstack/react-query'

// export async function getServerSideProps() {
// 	const posts = await postService.findAll()
// 	const post1 = await fetch('http://localhost:1488/api/posts', {
// 		next: {tags: ['posts']},
// 	})
//   return {
//     props: {
//       post1,
//     },
//   };
// }

const Feed: NextPage = async () => {
	const posts = await postService.findAll()
	return (
		<Container className='box-border flex flex-col'>
			<PostCreate isGrid={false} />

			<PostList posts={posts} title='Recommended' />
		</Container>
	)
}

export default Feed
