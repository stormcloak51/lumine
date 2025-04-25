'use client'

import { PostList } from '@/entities/post/'
import { PostCreate } from '@/features/post/create'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Grid } from '@mantine/core'
import { Suspense } from 'react'

import { ActionsSection } from './actions-section'
import { IUser } from '@/shared/config/types/user.types'

export const Wrapper = ({ slug, user }: { slug: string, user: IUser }) => {
  const {
    user: { username },
  } = useAuth()

  return (
    <Grid.Col span={7.5} className="pt-4">
      {username === slug ? <PostCreate /> : <ActionsSection user={user} />}
      <Suspense fallback={<div>Loading...</div>}>
        <PostList username={slug} feed={false} />
      </Suspense>
    </Grid.Col>
  )
}
