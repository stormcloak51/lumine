'use client'

import { CommentList } from '@/entities/comment'
import { useComments } from '@/entities/comment/model/useComments'
import { CommentCreate } from '@/features/comment/create/index'
import { TPost } from '@/shared/config/types/post.types'
import { timeAgo } from '@/shared/helpers/timeFormatter'
import { useAuth } from '@/shared/stores/user/useAuth'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { UserHoverCard } from '@/shared/ui/UserHoverCard'
import { Card, Divider, Text } from '@mantine/core'
// import DOMpurify from 'dompurify'
import { Circle, LoaderCircle } from 'lucide-react'
import { FC, useEffect } from 'react'

import { PostActions } from './post-actions'
import { ManagePost } from './post-manage'

export const PostItem: FC<
  TPost & { lastPostRef?: React.Ref<HTMLDivElement> }
> = (post) => {
  const { user } = useAuth()

  const {
    comments,
    isLoading,
    createComment,
    toggleCommentsVisibility,
    isCommentsVisible,
    hasNextPage,
    fetchNextPage,
    setNewCommentId,
    newCommentId,
  } = useComments(post.id)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewCommentId(null)
    }, 1000)
    return () => clearTimeout(timer)
  }, [newCommentId, setNewCommentId])

  return (
    <Card
      ref={post.lastPostRef}
      className={`!bg-[#1f2124] shadow-lg rounded-lg border border-[rgb(66,66,66)]`}
      key={post.id}
      withBorder
      shadow="sm"
      radius="md"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-x-4 items-center">
          <LumineAvatar
            size={40}
            url={post.User.userAvatar}
            username={post.User.username}
          />
          <UserHoverCard user={post.User} />
          <Circle fill="#ffdd9a" size={8} stroke="#ffdd9a" />
          <Text c="dimmed" size="md">
            {timeAgo(post.created_at)}
          </Text>
        </div>
        {user?.id === post.User.id && (
          <ManagePost post={post} content={post.content} />
        )}
      </div>
      <div
        className="w-full h-[1px] !px-0 my-2 "
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
          opacity: 0.32,
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      />
      <Text
        mt="sm"
        className="text-white ProseMirror"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-4 flex gap-x-3">
        <PostActions
          post={post}
          onClickComment={toggleCommentsVisibility}
          commentsCount={
            comments && comments?.length
              ? comments[0].total
              : post.Comment.length
          }
        />
      </div>
      <Divider
        className="!w-[calc(100%+var(--mantine-spacing-md)*2)] -mx-[var(--mantine-spacing-md)]"
        my={'sm'}
      />
      {isLoading && (
        <LoaderCircle className="animate-spin w-full mx-auto mb-5" size={34} />
      )}
      {isCommentsVisible && comments && comments?.length > 0 && !isLoading && (
        <CommentList
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          comments={comments.flatMap((page) => page.data)}
          newCommentId={newCommentId}
        />
      )}
      <CommentCreate
        onSubmit={(data) => {
          createComment(data)
          if (!isCommentsVisible) toggleCommentsVisibility()
        }}
        postId={post.id}
      />
    </Card>
  )
}
