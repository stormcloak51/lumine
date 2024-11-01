import { commentService } from '@/services/comment.service'
import { TComment, TCommentLike } from '@/types/comment.types'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'




export const useComments = (postId: number) => {

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
    queryFn: ({ pageParam = 1 }) => commentService.getById(postId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage.length === 5
      return hasMore ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
    staleTime: 1000
  })

  const createCommentMutation = useMutation({
    mutationFn: (data: TComment) => commentService.create(data),
    onSuccess: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] })

      const previousComments = queryClient.getQueryData(['comments', postId])

      queryClient.setQueryData(['comments', postId], (old: any) => ({
        pages: [
          [{ ...newComment, id: Date.now() }, ...(old?.pages[0] || []).slice(0, 4)],
          ...(old?.pages.slice(1) || [])
        ],
        pageParams: old?.pageParams || [1]
      }))

      return { previousComments }
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments)
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
    // onSuccess: async (newComment) => {
    //   await queryClient.cancelQueries({ queryKey: ['comments', postId] })

    //   const previousComments = queryClient.getQueryData(['comments', postId])

    //   queryClient.setQueryData(['comments', postId], (old: any) => ({
    //     pages: [
    //       [{ ...newComment, id: Date.now() }, ...(old?.pages[0] || []).slice(0, 4)],
    //       ...(old?.pages.slice(1) || [])
    //     ],
    //     pageParams: old?.pageParams || [1]
    //   }))

    //   return { previousComments }
    // },
    // onError: (err, newComment, context) => {
    //   queryClient.setQueryData(['comments', postId], context?.previousComments)  
    // },
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
  };
}