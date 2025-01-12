import { commentService } from '@/shared/api/comment.service'
import { TCommentResponse, TSubComment } from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { InfiniteData, QueryFilters, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'



interface props {
	postId: number
	commentId: number
}


export const useSubComments = ({postId, commentId}: props) => {
	
  const [newSubCommentId, setNewSubCommentId] = useState<number | null>(null) // для перехода к комменту
	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	const queryClient = useQueryClient()

  const {
    data: comments,
    isLoading,
    // error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['subComments', postId, commentId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await commentService.getSubcomments({postId, commentId, page: pageParam})

      return response
    },
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage.data.length === 5
      return hasMore ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
  })

  const createSubCommentMutation = useMutation({
    mutationFn: (data: Partial<TSubComment>) => {
      return commentService.createSubcomment(data)
    },
    onSuccess: (newSubComment) => {
      const queryFilter: QueryFilters = {
        queryKey: ['subComments', postId, commentId],
      }

      queryClient.cancelQueries(queryFilter)
      
      queryClient.setQueriesData<InfiniteData<TPaginatedResponse<TCommentResponse>, unknown> | undefined>(queryFilter, (oldData) => {
        if (!oldData) {
          return {
            pageParams: [1],
            pages: [
              {
                data: [newSubComment],
                total: 1
              }
            ]
          }
        }

        const updatedPages = oldData.pages.map((page, index) => {
          if (index === 0) {
            return {
              total: page.total + 1,
              data: [newSubComment, ...page.data]
            }
          }
          return page
        })


        setNewSubCommentId(newSubComment.id)
        return {
          pages: updatedPages,
          pageParams: oldData.pageParams,
        }
      })
    }
  })

	const toggleCommentsVisibility = () => {
		setIsCommentsVisible(prev => !prev)
	}

	return {
		comments: comments?.pages.flatMap(page => page.data),
		isLoading,
    createSubcomment: createSubCommentMutation.mutate,
    fetchNextPage,
		hasNextPage,
		isCommentsVisible,
		toggleCommentsVisibility,
    newSubCommentId,
    setNewSubCommentId,
	}
}