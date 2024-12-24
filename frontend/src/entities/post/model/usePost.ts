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


  const likePostMutation = useMutation({
    mutationFn: (postId: number) => postService.like(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({queryKey: ['posts']})

      const previousPosts = queryClient.getQueryData(['posts'])
      console.log(previousPosts, 'previousPosts')
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
