import { postService } from '@/shared/api/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSendPost = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      await postService.create({
        content,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })


  return mutation
}
