import { postService } from '@/shared/api/post.service'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { TPost } from '@/shared/config/types/post.types'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'

export const useSendPost = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      return await postService.create({
        content,
      })
    },
    onSuccess: async (post) => {
      const queryFilter: QueryFilters = {
        queryKey: ['posts'],
      }

      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<TPaginatedResponse<TPost> | undefined, unknown> | undefined>(queryFilter, (oldData) => {
        if (!oldData) {
          return {
            pageParams: [],
            pages: [{
              data: [post],
              nextPage: undefined,
              total: 1
            }]
          }
        }

        const firstPage = oldData?.pages[0]
        if (firstPage) {
          return {
            pageParams: oldData?.pageParams,
            pages: [
              {
                data: [post, ...firstPage.data],
                nextPage: firstPage.nextPage,
                total: firstPage.total + 1
              },
              ...oldData.pages.slice(1),
            ]
          }
        }
        return oldData
      }) 
        
    },
  })


  return mutation
}
