'use client'
import { TPost } from '@/types/post.types'
import { ActionIcon, Blockquote, Card, HoverCard, Text, Title, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import LumineAvatar from '../LumineAvatar'
import purify from 'dompurify'
import { timeAgo } from '@/lib/utils/timeAgo'
import { DMSans } from '@/fonts/fonts'
import { Circle, MessagesSquare, Quote, UserPlus } from 'lucide-react'
import Link from 'next/link'
import styles from '../styles/PostItem.module.scss'

export const PostItem: FC<TPost & { title: string }> = post => {
	const theme = useMantineTheme();
	return (
		<Card
			className={`!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] ${DMSans.className}`}
			key={post.id}
			withBorder
			shadow='sm'
			radius='md'>
			<div className='flex justify-start items-center'>
				<div className='flex flex-row gap-x-4 items-center'>
					<LumineAvatar size={40} url={post.User.userAvatar} username={post.User.username} />
					<HoverCard shadow='xl' openDelay={700}>
						<HoverCard.Target>
							<Text
								href={`/profile/${post.User.username}`}
								component={Link}
								className='hover:underline cursor-pointer'
								ml={-8}
								size='lg'
								fw={700}>
								{post.User.name} {post.User.surname}
							</Text>
						</HoverCard.Target>
						<HoverCard.Dropdown
							className='flex flex-row gap-x-4 rounded-xl'
							style={{
								border: '1px solid rgba(255, 200, 100, 0.15)',
								backgroundColor: 'rgba(31, 33, 36, 0.8)',
								backdropFilter: 'blur(6px)',
								boxShadow: '0 0 15px rgba(255, 184, 56, 0.1)',
							}}>
							<LumineAvatar size={50} url={post.User.userAvatar} username={post.User.username} />
							<div className=''>
								<div className='flex justify-between'>
									<div>
										<Title order={3}>
											{post.User.name} {post.User.surname}
										</Title>
										<Title mb={20} c='dimmed' order={4}>
											@{post.User.username}
										</Title>
									</div>
									<div className='flex flex-row gap-x-2'>
										<ActionIcon color={theme.colors.myColor[0]} variant='outline'>
											<UserPlus size={20} />
										</ActionIcon>
										<ActionIcon color={theme.colors.myColor[0]} variant='outline'>
											<MessagesSquare size={20} />
										</ActionIcon>
									</div>
								</div>
								<Blockquote
									maw={400}
									color={'#ffd37d'}
									iconSize={30}
									icon={<Quote size={16} />}
									className='pt-3 pl-5 whitespace-normal break-words'
									cite={post.User.name + ' ' + post.User.surname}
									styles={{
										icon: {
											border: '1px solid #ffd37d',
										},
									}}>
									<i>
										{post.User.bio === ''
											? 'No bio yet :( lorem15123123lkawmdkjaskjdaklsdmalkdsmalksdmalkdsmalksdm msdlkm askldma klsda lksdmal sdma'
											: post.User.bio}
									</i>
								</Blockquote>
							</div>
						</HoverCard.Dropdown>
					</HoverCard>
					<Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' />
					<Text c='dimmed' size='md'>
						{timeAgo(post.created_at)}
					</Text>
				</div>
			</div>
			<Text
				mt='sm'
				className='text-white ProseMirror'
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
