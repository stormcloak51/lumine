import { commentService } from '@/services/comment.service'
import { TComment } from '@/types/comment.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'




export const useComments = (postId: number) => {

	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	const queryClient = useQueryClient()

	const {data: comments, error, isLoading} = useQuery({
		queryKey: ['comments', postId],
		queryFn: () => commentService.getById(postId),
		select: (data) => data,
		enabled: isCommentsVisible,
		staleTime: 1000 * 30,
	})

	const createCommentMutation = useMutation({
		mutationFn: (data: TComment) => commentService.create(data),
		onSuccess: (data) => {
			queryClient.setQueryData(['comments', postId], (old: TComment[] = []) => [
        ...old,
        data
      ])
			
		}
	})

	const toggleCommentsVisibility = () => {
		setIsCommentsVisible((prev) => !prev)
	}

	return {
    comments,
    isLoading,
    error,
    createComment: createCommentMutation.mutate,
		toggleCommentsVisibility,
		isCommentsVisible,
  };
}