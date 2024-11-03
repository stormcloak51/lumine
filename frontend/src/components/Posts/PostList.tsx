'use client'
import { Flex } from '@mantine/core'
import { FC, Suspense, useCallback, useRef } from 'react'
import { PostItem } from './PostItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { postService } from '@/services/post.service'
import Loading from '@/app/(main)/feed/loading'

export interface IPostList {
	feed: boolean
	title: string
	username?: string
}

const PostList: FC<IPostList> = ({ username, feed, title = 'Posts' }) => {

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: ({ pageParam = 1 }) => {
				if (feed) {
					return postService.findAllSortedByDate(pageParam, 10)
				}
				return postService.findByUsername(username!, pageParam, 10)
			},
			getNextPageParam: (lastPage, pages) => {
				const hasMore = lastPage.data.length === 10
				return hasMore ? pages.length + 1 : undefined
			},
			initialPageParam: 1,
			refetchOnMount: true,
		})
	const allPosts = data?.pages
		.flatMap(page => page.data)
		.filter(
			(post, index, self) => index === self.findIndex(p => p.id === post.id)
		)

	const observerRef = useRef<IntersectionObserver | null>(null)
	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading || isFetchingNextPage) return
			if (observerRef.current) observerRef.current.disconnect()
			observerRef.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			})
			if (node) observerRef.current.observe(node)
		},
		[isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
	)

	return (
		<Suspense fallback={<Loading />}>
    {isLoading ? (
      <Loading />
    ) : (
      <Flex direction={'column'} className="gap-y-4">
        {allPosts?.map((post, index) => {
          const isLastPost = allPosts.length - 1 === index
          return (
            <PostItem
              lastPostRef={isLastPost ? lastPostRef : undefined}
              key={post.id}
              {...post}
              title={title}
            />
          )
        })}
      </Flex>
    )}
  </Suspense>
	)
}

export default PostList
