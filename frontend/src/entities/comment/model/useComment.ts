import { commentService } from '@/shared/api/comment.service'
import { CommentRoles, TCommentLike, TCommentResponse } from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useComment = (comment: TCommentResponse, role: CommentRoles) => {
  const { user: { id: userId } } = useAuth()
  const queryClient = useQueryClient()
  const [isLiked, setLiked] = useState(comment?.Like?.some((like) => like.userId === userId) ?? false)

  const likeCommentMutation = useMutation({
    mutationFn: async (data: TCommentLike) => {
      return commentService.like(data)
    },
    onSuccess: async (data) => {
      console.log(data, comment, comment.parrentId, 'lal')
      const queryFilter: QueryFilters = {
        queryKey: role === CommentRoles.MAINCOMMENT ? ['comments', comment.postId] : ['subComments', comment.postId, comment.parrentId],
      }


      await queryClient.cancelQueries(queryFilter)
      
      queryClient.setQueriesData<InfiniteData<TPaginatedResponse<TCommentResponse>>>(
        queryFilter,
        (oldData): InfiniteData<TPaginatedResponse<TCommentResponse>> => {
          if (!oldData) {
            console.error('Comments not found');
            throw Error('Comments not found');
          }

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page): TPaginatedResponse<TCommentResponse> => {
              return {
                ...page,
                data: page.data.map((cmt): TCommentResponse => {
                  if (cmt.id === comment.id) {
                    return {
                      ...cmt,
                      Like: isLiked
                        ? cmt.Like.filter((like) => like.userId !== userId)
                        : [...cmt.Like, { userId, commentId: cmt.id }],
                      likes: isLiked ? cmt.likes - 1 : cmt.likes + 1,
                    };
                  }
                  return cmt;
                }),
              };
            }),
          };
        }
      );

      setLiked(!isLiked)

    },
  })

  return {
    like: likeCommentMutation,
    isLiked,
  }
}