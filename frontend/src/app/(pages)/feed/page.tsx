'use client'
import { Card, Title, Group, Container, Textarea, Flex } from '@mantine/core'
import LumineAvatar from '@/app/components/LumineAvatar'
import { NextPage } from 'next'
import { useClickOutside } from '@mantine/hooks'
import { Camera, Video } from 'lucide-react'

import { useRef, useState } from 'react'
import PostList from '@/app/components/Posts/PostList'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const Feed: NextPage = ({}) => {
	const [styled, setStyled] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)

	const queryClient = useQueryClient()
	console.log(queryClient)
	const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
	const ref = useClickOutside(() => {
		setStyled(!styled)

		if (cardRef.current) {
			const rightSectionCard = cardRef.current?.children[0].children[0].children[2]
			cardRef.current.style.border = '1px solid rgb(66,66,66)'
			rightSectionCard.children[0].setAttribute('style', 'stroke: ')
			rightSectionCard.children[1].setAttribute('style', 'stroke: ')
		}
	})
	const handleFocus = () => {
		if (cardRef.current) {
			const rightSectionCard = cardRef.current?.children[0].children[0].children[2]
			cardRef.current.style.border = '1px solid #ffd37d'
			rightSectionCard.children[0].setAttribute('style', 'stroke: #ffd37d')
			rightSectionCard.children[1].setAttribute('style', 'stroke: #ffd37d')
		}
	}

	return (
		<Container className='ml-[290px] pl-[20px] box-border flex flex-col'>
			<Card
				className='!bg-[#1f2124] mb-[20px] transition-all'
				withBorder
				shadow='sm'
				radius='lg'
				ref={cardRef}>
				<Textarea
					ref={ref}
					size='md'
					radius='lg'
					variant='unstyled'
					className='w-full !h-full text-[14px] px-[15px] relative'
					onFocus={handleFocus}
					autosize
					minRows={1}
					placeholder="What's news?"
					leftSection={
						<LumineAvatar
							size={38}
							src='https://i.pravatar.cc/300'
							className='mr-[35px]'
							position={'absolute'}
							hasStories={true}
						/>
					}
					rightSection={
					<>
						<Camera className='transition-all'/>
						<Video className='transition-all'/>
					</>}
					rightSectionProps={{className: 'w-[60px] h-[36px] flex items-center justify-center gap-2'}}
				/>
			</Card>
			<Card className='!bg-[#1f2124]' shadow='sm' withBorder radius='lg'>
				<Group>
					<Title className='font-sans font-medium'>News</Title>
					<Flex>
						<PostList />
					</Flex>
				</Group>
			</Card>
		</Container>
	)
}

export default Feed
