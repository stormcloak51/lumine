'use client'

import Loading from '@/app/(pages)/(main)/feed/loading'
import { getSocket } from '@/shared/api/socket.service'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Flex } from '@mantine/core'
import { FC, useEffect } from 'react'

import { usePostList } from '../model/usePostList'
import { PostItem } from './post-item'

export interface IPostList {
  feed: boolean
  username?: string
}

export const PostList: FC<IPostList> = ({ feed, username }) => {
  const { isLoading, allPosts, lastPostRef } = usePostList({
    feed,
    username,
  })


  if (isLoading) return <Loading />
  return (
    <Flex direction={'column'} className="gap-y-4">
      {allPosts &&
        allPosts.map((postPage, pageIndex) => {
          return postPage?.data?.map((post, postIndex) => {
            const isLastPost =
              postPage?.data &&
              postPage?.data?.length - 1 === postIndex &&
              pageIndex === allPosts.length - 1
            return (
              <PostItem
                lastPostRef={isLastPost ? lastPostRef : undefined}
                key={post.id}
                {...post}
              />
            )
          })
        })}
    </Flex>
  )
}
