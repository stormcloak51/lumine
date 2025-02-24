import { PostList } from '@/entities/post/index'
import { PostCreate } from '@/features/post/create'
import { Container } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lumine - Discover',
  description: 'Discover the latest news!',
}

export default async function Feed() {
  return (
    <Container p={0} className="box-border flex flex-col">
      <PostCreate />
      <PostList feed={true} />
    </Container>
  )
}
