import { postService } from '@/shared/api/post.service'
import { TPost, TPostLikes } from '@/shared/config/types/post.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface props {
  post: TPost
}

export const usePost = ({ post }: props) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [isLiked, setIsLiked] = useState(post?.Like?.some((like) => like.userId === user?.id) ?? false)

  const updatePostInCache = (postId: number, liked: boolean) => {
    queryClient.setQueriesData<{
      pageParams: number[]
      pages: { data: TPost[]; total: number }[]
    }>({ queryKey: ['posts'] }, (oldData) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: page.data.map((p) => {
            if (p.id === postId) {
              const newLike: TPostLikes = {
                userId: user?.id || '',
                postId: postId,
              }

              return {
                ...p,
                likes: liked ? p.likes + 1 : p.likes - 1,
                Like: liked
                  ? [...(p.Like || []), newLike]
                  : (p.Like || []).filter((like) => like.userId !== user?.id),
              }
            }
            return p
          }),
        })),
      }
    })
  }

  const likePostMutation = useMutation({
    mutationFn: (postId: number) => postService.like(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      updatePostInCache(postId, true)
    },
    onError: (_, postId) => {
      updatePostInCache(postId, false)
    },
		onSuccess: () => {
			setIsLiked((prev) => !prev)
		}
  })

  const handleLike = () => {
    likePostMutation.mutate(post.id)
  }

  return {
    isLiked,
    handleLike,
  }
}
