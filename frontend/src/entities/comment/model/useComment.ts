import { commentService } from '@/shared/api/comment.service'
import { TCommentLike, TCommentResponse } from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useComment = (comment: TCommentResponse) => {
  const { user: { id: userId } } = useAuth()
  const queryClient = useQueryClient()
  const [isLiked, setLiked] = useState(comment?.Like?.some((like) => like.userId === userId) ?? false)

  const likeCommentMutation = useMutation({
    mutationFn: async (data: TCommentLike) => {
      return commentService.like(data)
    },
    onSuccess: async (data) => {
      const queryFilter: QueryFilters = {
        queryKey: ['comments', comment.postId],
      }

      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<
        InfiniteData<TPaginatedResponse<TCommentResponse>>
      >(queryFilter, (oldData) => {
        if (!oldData) {
          console.error('Comments not found')
          throw Error('Comments not found')
        }
				console.log(oldData)
        return {
					pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((cmt) => {
              if (cmt.id === comment.id) {
                return {
                  ...cmt,
                  Like: isLiked ? cmt.Like.filter(like => like.userId !== userId) : [...cmt.Like, { userId }],
                  likes: isLiked ? cmt.likes - 1 : cmt.likes + 1
                }
              }
              return cmt
            }),
          })),
        }
      })

      setLiked(!isLiked)

    },
  })

  return {
    like: likeCommentMutation,
    isLiked,
  }
}