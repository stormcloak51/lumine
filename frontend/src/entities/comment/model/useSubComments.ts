import { commentApi } from '@/shared/api/commentApi'
import { TCommentLike, TCommentResponse, TSubComment } from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
      const response = await commentApi.getSubcomments({postId, commentId, page: pageParam})

      return response as TPaginatedResponse<TCommentResponse>
    },
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage.data.length === 5
      return hasMore ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
  })

  const createSubCommentMutation = useMutation({
    mutationFn: (data: Partial<TSubComment>) => {
      return commentApi.createSubcomment(data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId]
      })
      queryClient.invalidateQueries({
        queryKey: ['subComments', postId, commentId],
        refetchType: 'active'
      })
    }
  })

  const likedSubCommentMutation = useMutation({
		mutationFn: async (data: TCommentLike) => {
      return commentApi.like(data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
        refetchType: 'none'
      })
      queryClient.invalidateQueries({
        queryKey: ['subComments', postId, commentId],
        refetchType: 'active'
      })
    }
  })

	const toggleCommentsVisibility = () => {
		setIsCommentsVisible(prev => !prev)
	}

	return {
		comments: comments?.pages.flatMap(page => page.data),
		isLoading,
    createSubcomment: createSubCommentMutation.mutate,
		likeSubComment: likedSubCommentMutation.mutate,
    fetchNextPage,
		hasNextPage,
		isCommentsVisible,
		toggleCommentsVisibility
	}
}