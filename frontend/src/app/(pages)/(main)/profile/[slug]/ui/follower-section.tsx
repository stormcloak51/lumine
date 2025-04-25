'use client'

import { IUser } from '@/shared/config/types/user.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { Avatar, Card, Grid, Title } from '@mantine/core'
import Link from 'next/link'

export const FollowerSection = ({
  friends,
  slug,
}: {
  friends: IUser[]
  slug: string
}) => {
  const {
    user: { username },
  } = useAuth()
  return (
    <Grid.Col className="px-0 pt-4" span={4} offset={0.5}>
      <Card className="!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] !py-[12px]">
        <Link href={`/friends/${slug === username ? '' : slug}`}>
          <Title order={3} className="cursor-pointer">
            Friends - {friends?.length}
          </Title>
        </Link>
        <Avatar.Group spacing={'sm'}>
          {friends?.map((friend) => (
            <Avatar
              className="border border-white/20"
              component={Link}
              href={`/profile/${friend?.username}`}
              key={friend?.id}
              size={46}
              src={friend.userAvatar}
            />
          ))}
        </Avatar.Group>
      </Card>
    </Grid.Col>
  )
}
