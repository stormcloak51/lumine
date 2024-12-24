import { postService } from '@/shared/api/post.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

interface props {
	feed: boolean
	username?: string
}

export const usePostList = ({ feed, username }: props) => {
	const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: async ({ pageParam = 1 }) => {
				const response = feed ? await postService.findAllSortedByDate(pageParam) : await postService.findByUsername(username!, pageParam)
				return response
			},
			getNextPageParam: (lastPage, pages) => {
				const hasMore = lastPage?.data?.length === 10
				return hasMore ? pages.length + 1 : undefined
			},
			initialPageParam: 1,
			refetchOnMount: false,
		})

	// const allPosts = data?.pages.flatMap(page => page)
	const observerRef = useRef<IntersectionObserver | null>(null)
	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (status == 'pending' || isFetchingNextPage) return
			if (observerRef.current) observerRef.current.disconnect()
			observerRef.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			})
			if (node) observerRef.current.observe(node)
		},
		[status, isFetchingNextPage, hasNextPage, fetchNextPage]
	)

	return {
		isLoading: status === 'pending',
		allPosts: data?.pages,
		lastPostRef,
	}
}
