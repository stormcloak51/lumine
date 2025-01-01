'use client'

import { useComments } from '@/entities/comment/model/useComments'
import {
  CommentRoles,
  TCommentResponse,
} from '@/shared/config/types/comment.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Button, useMantineTheme } from '@mantine/core'
import { AiFillLike } from 'react-icons/ai'
import { BiSolidMessageRoundedDots } from 'react-icons/bi'
import { FaEllipsis } from 'react-icons/fa6'

interface ICommentActions {
  comment: TCommentResponse
  onClickComment: () => void
  role?: CommentRoles
}

export const CommentActions = ({
  role,
  comment,
  onClickComment,
}: ICommentActions) => {
  const {
    user: { id },
  } = useAuth()

  const { likeComment } = useComments(comment.postId)

  const likeCount = comment?.likes ?? 0
  const subCommentsCount =
    !comment.parrentId ?? comment?.subComments?.length ?? 0
  const hasUserLiked =
    comment?.Like?.some((like) => like.userId === id) ?? false

  const theme = useMantineTheme()

  return (
    <div className="flex flex-row gap-x-4 items-center">
      <Button
        p={0}
        color={hasUserLiked ? theme.colors.myColor[5] : theme.colors.myColor[2]}
        className="flex items-center"
        onClick={() => {
          likeComment({
            postId: comment.postId,
            commentId: comment.id,
          })
        }}
        variant="transparent"
      >
        <AiFillLike />
        <span className="ml-1">{likeCount}</span>
      </Button>
      {role === CommentRoles.MAINCOMMENT && (
        <Button
          p={0}
          className="flex items-center"
          color={theme.colors.myColor[2]}
          onClick={onClickComment}
          variant="transparent"
        >
          <BiSolidMessageRoundedDots />
          <span className="ml-1">{subCommentsCount}</span>
        </Button>
      )}
      <Button
        p={0}
        className="ml-2"
        color={theme.colors.myColor[2]}
        classNames={{
          section: 'ml-1',
        }}
        variant="transparent"
      >
        <FaEllipsis />
      </Button>
    </div>
  )
}
