import { postService } from '@/shared/api/post.service'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { TPost, TPostLikes } from '@/shared/config/types/post.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface props {
  post: TPost
}

export const usePost = ({ post }: props) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [isLiked, setIsLiked] = useState(post?.Like?.some((like) => like.userId === user?.id) ?? false)


  const likePostMutation = useMutation({
    mutationFn: (postId: number) => {
      return postService.like(postId)
    },
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ['posts'],
      }
      
      await queryClient.cancelQueries(queryFilter)
      
      queryClient.setQueriesData<InfiniteData<TPaginatedResponse<TPost> | undefined, unknown> | undefined>(queryFilter, (oldData) => {
        if (!oldData) {
          throw new Error('Post not found')
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              data: page?.data.map((existingPost) => {
                if (existingPost.id === newPost.id) {
                  return {
                    ...existingPost,
                    Like: isLiked ? existingPost.Like.filter(like => like.userId !== user?.id) : [...existingPost.Like, { userId: user?.id }],
                    likes: isLiked ? existingPost.likes - 1 : existingPost.likes + 1
                  }
                }
                return existingPost
              })
            }
          })
        }
      })
      setIsLiked(!isLiked)
    },
  })

  const handleLike = () => {
    likePostMutation.mutate(post.id)
  }

  return {
    isLiked,
    handleLike,
    data: likePostMutation.data
  }
}
