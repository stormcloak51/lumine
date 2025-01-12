'use client'

import { CommentCreate } from '@/features/comment/create/index'
import {
  CommentRoles,
  TCommentResponse,
} from '@/shared/config/types/comment.types'
import { timeAgo } from '@/shared/helpers/timeFormatter'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { UserHoverCard } from '@/shared/ui/UserHoverCard'
import { Text } from '@mantine/core'
import purify from 'dompurify'
import { useEffect, useRef } from 'react'

import { useSubComments } from '../model/useSubComments'
import { CommentActions } from './comment-actions'
import { CommentList } from './comment-list'

interface props {
  comment: TCommentResponse
  role?: CommentRoles
  isNew: boolean
}

export const CommentItem = ({
  comment,
  role = CommentRoles.MAINCOMMENT,
  isNew = false,
}: props) => {
  const {
    comments,
    isLoading,
    createSubcomment,
    isCommentsVisible,
    toggleCommentsVisibility,
    fetchNextPage,
    hasNextPage,
    newSubCommentId
  } = useSubComments({ postId: comment.postId, commentId: comment.id })
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isNew && commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isNew])



  return (
    <div ref={commentRef} className="flex flex-row gap-x-2">
      <LumineAvatar
        size={30}
        url={comment.user.userAvatar}
        username={comment.user.username}
      />
      <div
        className={`w-full ${
          role === CommentRoles.MAINCOMMENT
            ? 'border-b border-[rgb(66,66,66)]'
            : ''
        }`}
      >
        <div className="flex flex-row items-center gap-x-3">
          <UserHoverCard
            ml={0}
            targetSize="md"
            user={comment.user}
          />
          <Text size="md" c={'dimmed'}>
            {timeAgo(comment.created_at.toString())}
          </Text>
        </div>

        <Text
          mt="sm"
          className="!mt-2 text-[rgba-(255, 255, 255, 0.7)] ProseMirror"
          dangerouslySetInnerHTML={{ __html: purify.sanitize(comment.content) }}
        />
        <CommentActions
          role={role}
          onClickComment={toggleCommentsVisibility}
          comment={comment}
        />
        {comments &&
          !isLoading &&
          isCommentsVisible &&
          role !== CommentRoles.SUBCOMMENT && (
            <div className={comments.length > 0 ? 'mt-3' : ''}>
              <CommentList
                comments={comments}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                newCommentId={newSubCommentId}
              />
              <CommentCreate
                cl="mb-5"
                commentId={comment.id}
                onSubmit={(data) => {
                  if (data.commentId) {
                    createSubcomment(data)
                    if (!isCommentsVisible) toggleCommentsVisibility()
                  }
                }}
                postId={comment.postId}
              />
            </div>
          )}
      </div>
    </div>
  )
}
