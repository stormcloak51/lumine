'use client'
import { getPostByQuery } from '@/lib/actions/posts'
import { Card, Flex, Group, Image, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

interface IPostList {
	queryKey: string
	title: string
}

const PostList: FC<IPostList> = ({title = 'Posts', queryKey }) => {
	const { data } = useQuery({
		queryKey: ['posts', queryKey],
		queryFn: () => getPostByQuery(queryKey),
	})

	return (
		<Flex direction={'column'} className='gap-y-4'>
			{data?.map((post, index) => {
				return (
					<Card key={post.id} withBorder shadow='sm' radius='md'>
						{index === 0 && (
							<Card.Section withBorder inheritPadding py='xs'>
								<Group justify='space-between'>
									<Text fw={500}>{title}</Text>
								</Group>
							</Card.Section>
						)}

						<Text mt='sm' c='dimmed' size='sm'>
							{post.content}
						</Text>

						<Card.Section mt='sm'>
							<Image
								src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
								alt='picture'
							/>
						</Card.Section>
					</Card>
				)
			})}
		</Flex>
	)
}

export default PostList
