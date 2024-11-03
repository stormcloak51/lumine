import { commentService } from '@/services/comment.service'
import { TCommentResponse } from '@/types/comment.types'
import { TPaginatedResponse } from '@/types/general.types'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'


interface props {
	postId: number
	commentId: number
}


export const useSubComments = ({postId, commentId}: props) => {
	
	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	const queryClient = useQueryClient()

  const {
    data: comments,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['subComments', postId, commentId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await commentService.getSubcomments({postId, commentId, page: pageParam})

      return response as TPaginatedResponse<TCommentResponse>
    },
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage.data.length === 5
      return hasMore ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
  })

	const toggleCommentsVisibility = () => {
		setIsCommentsVisible(prev => !prev)
	}

	return {
		comments: comments?.pages.flatMap(page => page.data),
		isLoading,
		fetchNextPage,
		hasNextPage,
		isCommentsVisible,
		toggleCommentsVisibility
	}
}