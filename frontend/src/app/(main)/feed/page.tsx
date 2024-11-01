import { Container } from '@mantine/core'

import { PostCreate } from '@/app/components/Posts/PostCreate'
import PostList from '@/app/components/Posts/PostList'
import { TPost } from '@/types/post.types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { axiosWithAuth } from '@/api/interceptors'
import { Suspense, useCallback, useRef } from 'react'
import Loading from './loading'

export default function Feed() {
	return (
		<Container p={0} className='box-border flex flex-col'>
			<PostCreate isGrid={false} />
			<PostList feed={true} title='Recommended' />
		</Container>
	)
}
