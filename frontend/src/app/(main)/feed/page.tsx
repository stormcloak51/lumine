'use client'
import { Container } from '@mantine/core'

import { PostCreate } from '@/app/components/Posts/PostCreate'
import PostList from '@/app/components/Posts/PostList'
import Loading from './loading'
import { TPost } from '@/types/post.types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { axiosWithAuth } from '@/api/interceptors'
import { useCallback, useRef } from 'react'


export default function Feed() {


	const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam = 1 }) =>
			axiosWithAuth.get(`/posts/sortedByLikes`, { params: { page: pageParam, limit: 10 } }).then((res) => res.data),
		getNextPageParam: (lastPage, pages) => {
			const hasMore = lastPage.data.length === 10;
			return hasMore ? pages.length + 1 : undefined;
		},
		initialPageParam: 1,
	});

	const allPosts = data?.pages.flatMap((page) => page.data)
	.filter((post, index, self) => 
		index === self.findIndex((p) => p.id === post.id)
	);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );
	return (

		isLoading ? (
			<Loading />
		) : (
			<Container p={0} className='box-border flex flex-col'>
				<PostCreate isGrid={false} />
				<PostList lastPostRef={lastPostRef} posts={allPosts} title='Recommended' />
			</Container>
		)
	)
}
