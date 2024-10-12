'use client'
import { TUser } from '@/lib/types'
import { Grid, Card, Title, Avatar } from '@mantine/core'
import { FC } from 'react'

export const FollowerSection: FC<{ userAvatar: TUser['userAvatar'] }> = ({userAvatar}) => {
	return (
		<Grid.Col className='px-0 pt-4' span={4} offset={0.5}>
			<Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'>
				<Title order={3}>Followers</Title>
				<Avatar.Group spacing={'sm'}>
					<Avatar size={46} src={userAvatar} />
					<Avatar size={46} src={userAvatar} />
					<Avatar size={46} src={userAvatar} />
					<Avatar size={46}>+5</Avatar>
				</Avatar.Group>
			</Card>
		</Grid.Col>
	)
}
