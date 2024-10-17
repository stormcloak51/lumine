'use client'
import purify from 'dompurify'
import { TPost } from '@/types/post.types'
import { Card, Flex, Grid, Group, Text } from '@mantine/core'
import { FC } from 'react'

interface IPostList {
	// queryKey?: string
	title: string
	posts?: TPost[]
	isGrid?: boolean
}

const PostList: FC<IPostList> = ({ title = 'Posts', posts, isGrid = false }) => {
	if (isGrid) {
		return (
			<Grid.Col span={7.5} className='mt-3'>
				<Flex direction={'column'} className='gap-y-4'>
					{posts?.map((post, index) => {
						return (
							<Card
								className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'
								key={post.id}
								withBorder
								shadow='sm'
								radius='md'>
								{index === 0 && (
									<Card.Section withBorder inheritPadding py='xs'>
										<Group justify='space-between'>
											<Text fw={500}>{title}</Text>
										</Group>
									</Card.Section>
								)}

								<Text
									mt='sm'
									className='text-white'
									size='lg'
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
					})}
				</Flex>
			</Grid.Col>
		)
	}
	return (
		<Flex direction={'column'} className='gap-y-4'>
			{posts?.map((post, index) => {
				return (
					<Card
						className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'
						key={post.id}
						withBorder
						shadow='sm'
						radius='md'>
						{index === 0 && (
							<Card.Section withBorder inheritPadding py='xs'>
								<Group justify='space-between'>
									<Text fw={500}>{title}</Text>
								</Group>
							</Card.Section>
						)}

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
			})}
		</Flex>
	)
}

export default PostList
