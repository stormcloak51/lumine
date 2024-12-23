import { postService } from '@/shared/api/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Editor } from '@tiptap/react'

export const useSendPost = (editor: Editor) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      await postService.create({
        content,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      editor?.commands.clearContent()
    },
  })

  const handleSend = () => {
    const postContent = editor.getHTML()

    if (postContent) {
      mutation.mutate(postContent)
    }
  }

  const contentLength = editor ? editor.getText().length : 0

  return {
    handleSend,
    contentLength,
  }
}
