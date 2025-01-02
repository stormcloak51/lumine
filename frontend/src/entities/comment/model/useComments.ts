import { commentService } from '@/shared/api/comment.service'
import {
  TCommentResponse,
  TCreateComment,
} from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import {
  InfiniteData,
  QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'

export const useComments = (postId: number) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  const [didUserAddComm, setUserAddComm] = useState(false)
  const queryClient = useQueryClient()
  const [newCommentId, setNewCommentId] = useState<number | null>(null)

  const {
    data: comments,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await commentService.getById(postId, pageParam)
      return response as TPaginatedResponse<TCommentResponse>
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || !lastPage.data || !Array.isArray(lastPage.data)) {
        return undefined
      }
      return lastPage.data.length >= 5 ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    enabled: isCommentsVisible,
  })

  const createCommentMutation = useMutation({
    mutationFn: (data: TCreateComment) => {
      return commentService.create(data)
    },
    onSuccess: (newComment) => {
      setNewCommentId(newComment.id)
      const queryFilter: QueryFilters = {
        queryKey: ['comments', postId],
      }

      queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<
        InfiniteData<TPaginatedResponse<TCommentResponse>, unknown>
      >(queryFilter, (oldData) => {
        if (!oldData) {
          return {
            pages: [
              {
                data: [newComment],
                total: 1,
              },
            ],
            pageParams: [1],
          }
        }

        const updatedPages = oldData.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              total: page.total + 1,
              data: [{ ...newComment, subComments: [] }, ...page.data],
            }
          }
          return page
        })

        return {
          pages: updatedPages,
          pageParams: oldData.pageParams,
        }
      })
    },
  })


  const toggleCommentsVisibility = () => {
    setIsCommentsVisible((prev) => !prev)
  }

  return {
    comments: comments?.pages,
    isLoading,
    error,
    createComment: createCommentMutation.mutate,
    likeComment: console.log,
    toggleCommentsVisibility,
    isCommentsVisible,
    fetchNextPage,
    hasNextPage: hasNextPage && !didUserAddComm,
    count: comments?.pages.reduce((acc, curr) => acc + curr.data.length, 0),
    newCommentId,
    setNewCommentId,
  }
}