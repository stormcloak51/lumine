import { postApi } from '@/shared/api/postApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

interface props {
	feed: boolean
	username?: string
}

export const usePostList = ({ feed, username }: props) => {
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: ({ pageParam = 1 }) => {
				if (feed) {
					return postApi.findAllSortedByDate(pageParam, 10)
				}
				return postApi.findByUsername(username!, pageParam, 10)
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

	return {
		isLoading,
		allPosts,
		lastPostRef,
	}
}
