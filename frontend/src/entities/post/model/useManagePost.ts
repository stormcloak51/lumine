import { postApi } from '@/shared/api/postApi'
import { useAuth } from '@/shared/stores/user/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface props {
	closeEditPostModal: () => void
	closeDeletePostModal: () => void
}

export const useManagePost = ({
	closeDeletePostModal,
	closeEditPostModal,
}: props) => {
	const {
		user: { id: userId },
	} = useAuth()
	const queryClient = useQueryClient()

	const editPostMutation = useMutation({
		mutationFn: ({ content, id }: { content: string; id: number }) =>
			postApi.edit({ content, postId: id, userId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			closeEditPostModal()
		},
	})

	const deletePostMutation = useMutation({
		mutationFn: (id: number) => postApi.delete({ postId: id, userId }),
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
