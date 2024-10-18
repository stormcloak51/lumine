import { TPost } from '@/types/post.types'
import { Card, Group, Text, Title } from '@mantine/core'
import { FC } from 'react'
import LumineAvatar from '../LumineAvatar'
import purify from 'dompurify'
import { timeAgo } from '@/lib/utils/timeAgo'
import { krona } from '@/fonts/fonts'

export const PostItem: FC<TPost & { title: string }> = post => {
	return (
		<Card
			className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'
			key={post.id}
			withBorder
			shadow='sm'
			radius='md'>


			<div className='flex justify-start items-center'>
				<div className='flex flex-row gap-x-2 items-center'>
					<LumineAvatar size={24} url={post.User.userAvatar} username={post.User.username} />
					<Text size='sm'>@{post.User.username}</Text>
					<Text size='xs'>{timeAgo(post.created_at)}</Text>
				</div>
			</div>
			<Text
				mt='sm'
				className='text-white'
				size='md'
				dangerouslySetInnerHTML={{ __html: purify.sanitize(post.content) }}
			/>
			{/* 
						<Card.Section mt='sm'>
							<Image
								src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
								alt='picture'
							/>
						</Card.Section> */}
		</Card>
	)
}
