import { useAuth } from '@/shared/lib/useAuth'
import { postApi } from '@/shared/api/postApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Editor } from '@tiptap/react'



export const useSendPost = (editor: Editor) => {

	const {user} = useAuth()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (content: string) => {
			await postApi.create({
				content,
				User: user
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			editor?.commands.clearContent()
		}
	})
	
	const handleSend = () => {
		const postContent = editor.getHTML()

		if (postContent) {
			mutation.mutate(postContent)
		}
	}

	const contentLength = editor.getText().length

	return {
		handleSend,
		contentLength
	}
}