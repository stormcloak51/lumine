'use client'

import { PostList } from '@/entities/post/'
import { PostCreate } from '@/features/post/create'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Grid} from '@mantine/core'
import { Suspense} from 'react'

import { ActionsSection } from './actions-section'

export const Wrapper = ({ slug }: { slug: string }) => {

  const {
    user: { username },
  } = useAuth()

  return (
    <Grid.Col span={7.5} className="pt-4">
      {username === slug ? <PostCreate /> : <ActionsSection />}
      <Suspense fallback={<div>Loading...</div>}>
        <PostList username={slug} feed={false} />
      </Suspense>
    </Grid.Col>
  )
}
