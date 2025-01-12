'use client'

import {
  CommentRoles,
  TCommentResponse,
} from '@/shared/config/types/comment.types'
import { Button, useMantineTheme } from '@mantine/core'
import { AiFillLike } from 'react-icons/ai'
import { BiSolidMessageRoundedDots } from 'react-icons/bi'
import { FaEllipsis } from 'react-icons/fa6'
import { useComment } from '../model/useComment'

interface ICommentActions {
  comment: TCommentResponse
  onClickComment: () => void
  role?: CommentRoles
}

export const CommentActions = ({
  role = CommentRoles.MAINCOMMENT,
  comment,
  onClickComment,
}: ICommentActions) => {
  const { like, isLiked } = useComment(comment, role)

  const theme = useMantineTheme()

  return (
    <div className="flex flex-row gap-x-4 items-center">
      <Button
        p={0}
        color={isLiked ? theme.colors.myColor[5] : theme.colors.myColor[2]}
        className="flex items-center"
        onClick={() => like.mutate({
          commentId: comment.id,
          postId: comment.postId,
        })}
        variant="transparent"
      >
        <AiFillLike />
        <span className="ml-1">{comment.likes}</span>
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
          <span className="ml-1">{comment.subComments?.length}</span>
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