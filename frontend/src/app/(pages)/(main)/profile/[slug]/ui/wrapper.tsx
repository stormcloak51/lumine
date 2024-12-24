'use client'

import { PostList } from '@/entities/post/'
import { PostCreate } from '@/features/post/create'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Grid } from '@mantine/core'

import { ActionsSection } from './actions-section'

export const Wrapper = ({ slug }: { slug: string }) => {
  const { user: {username} } = useAuth()
  return (
    <Grid.Col span={7.5} className="pt-4">
      {slug === username ? <PostCreate /> : <ActionsSection />}
      <PostList feed={false} username={slug} />
    </Grid.Col>
  )
}
