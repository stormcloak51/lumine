import { commentService } from '@/services/comment.service'
import { TComment, TCommentLike, TCommentResponse } from '@/types/comment.types'
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { TPaginatedResponse } from '@/types/general.types'

export const useComments = (postId: number) => {

  const [createdComment, setCreatedComment] = useState<TCommentResponse>()
	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	const queryClient = useQueryClient()
  

  const {
    data: comments,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await commentService.getById(postId, pageParam)

      return response as TPaginatedResponse<TCommentResponse>
    },
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage.data.length === 5
      return hasMore ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
  })

  const createCommentMutation = useMutation({
    mutationFn: (data: TComment) => commentService.create(data),
    onSuccess: (data: TCommentResponse) => {
      setCreatedComment(data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
        refetchType: 'none'
      })
    }
  })

	const likedCommentMutation = useMutation({
		mutationFn: async (data: TCommentLike) => {
      return commentService.like(data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
        refetchType: 'none'
      })
    }
  })

	const toggleCommentsVisibility = () => {
		setIsCommentsVisible((prev) => !prev)
	}

	return {
    comments: comments?.pages.flat(),
    isLoading,
    error,
    createComment: createCommentMutation.mutate,
    likeComment: likedCommentMutation.mutate,
		toggleCommentsVisibility,
		isCommentsVisible,
		fetchNextPage,
		hasNextPage,
    createdComment,
  };
}