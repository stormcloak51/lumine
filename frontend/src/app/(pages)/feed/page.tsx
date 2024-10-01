import { Card, Title, Group, Container, Flex } from '@mantine/core'
import { NextPage } from 'next'

import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'
// import { useQueryClient } from '@tanstack/react-query'

const Feed: NextPage = ({}) => {

	return (
		<Container className='ml-[290px] pl-[20px] box-border flex flex-col'>
			<PostCreate/>
			<Card className='!bg-[#1f2124]' shadow='sm' withBorder radius='lg'>
				<Group>
					<Title className='font-sans font-medium'>asd</Title>
					<Flex>
						<PostList />
					</Flex>
				</Group>
			</Card>
		</Container>
	)
}

export default Feed
