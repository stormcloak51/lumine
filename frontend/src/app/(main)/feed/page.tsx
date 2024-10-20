import { Container } from '@mantine/core'

import PostCreate from '@/app/components/Posts/PostCreate'
import PostList from '@/app/components/Posts/PostList'
import { postService } from '@/services/post.service'
import { Suspense } from 'react'
import Loading from './loading'

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

export default async function Feed() {
	// const posts = await postService.findAll()
	return (
		<Suspense fallback={<Loading />}>
			<Container className='box-border flex flex-col'>
				<PostCreate isGrid={false} />
				<PostList posts={await postService.findAll()} title='Recommended' />
			</Container>
		</Suspense>
		// <Loading/>
	)
}
