import { postService } from '@/shared/api/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface props {
	closeEditPostModal: () => void
	closeDeletePostModal: () => void
}

export const useManagePost = ({
	closeDeletePostModal,
	closeEditPostModal,
}: props) => {
	const queryClient = useQueryClient()

	const editPostMutation = useMutation({
		mutationFn: ({ content, id }: { content: string; id: number }) =>
			postService.edit(id, content),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			closeEditPostModal()
		},
	})

	const deletePostMutation = useMutation({
		mutationFn: (id: number) => postService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			closeDeletePostModal()
		},
	})

	return {
		handleDelete: (id: number) => deletePostMutation.mutate(id),
		handleEdit: ({ content, id }: { content: string; id: number }) =>
			editPostMutation.mutate({ content, id }),
	}
}
