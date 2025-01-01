'use client'

import {
  CommentRoles,
  TCommentResponse,
} from '@/shared/config/types/comment.types'
import { TPaginatedResponse } from '@/shared/config/types/general.types'
import { Button } from '@mantine/core'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'

import { CommentItem } from './comment-item'

interface ICommmentList {
  comments: TCommentResponse[]
  hasNextPage: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<TPaginatedResponse<TCommentResponse>>,
      unknown
    >
  >
  newCommentId: number | null
}

export const CommentList = ({
  comments,
  hasNextPage,
  fetchNextPage,
  newCommentId,
}: ICommmentList) => {
  return (
    <div className="flex flex-col gap-y-4 mb-5">
      {comments &&
        comments.map((comment) => (
          <CommentItem
            key={`${comment.postId}/${comment.id}`}
            role={
              comment.subComments
                ? CommentRoles.MAINCOMMENT
                : CommentRoles.SUBCOMMENT
            }
            comment={comment}
            isNew={newCommentId === comment.id}
          />
        ))}
      {hasNextPage && (
        <Button
          className="w-[25%] mx-auto rounded-lg"
          onClick={() => fetchNextPage()}
          style={{
            background: 'linear-gradient(45deg, #ffb931 10%, #916000 90%)',
            color: 'white',
            borderWidth: 0,
          }}
        >
          Load more
        </Button>
      )}
    </div>
  )
}
