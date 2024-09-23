'use client'
import { Card, Title, Group, Container, Textarea } from '@mantine/core'
import LumineAvatar from '@/app/components/LumineAvatar'
import { NextPage } from 'next'
import { useClickOutside } from '@mantine/hooks'

import { useRef, useState } from 'react'
import Link from 'next/link'

const Feed: NextPage = ({}) => {
	const [styled, setStyled] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)

	const ref = useClickOutside(() => {
		setStyled(!styled)
		if (cardRef.current) {
			cardRef.current.style.border = '1px solid rgb(66,66,66)'
		}
	})
	const handleFocus = () => {
		if (cardRef.current) {
			cardRef.current.style.border = '1px solid #ffd37d'
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
					className='w-[500px] !h-full text-[14px] pl-[15px] relative'
					onFocus={handleFocus}
					autosize
					minRows={1}
					placeholder="What's news?"
					leftSection={
						<LumineAvatar
							size={38}
							component={Link}
							href='/profile'
							src='https://i.pravatar.cc/300'
							className='mr-[35px] absolute top-0'
							hasStories={true}
						/>
					}
				/>
			</Card>
			<Card className='!bg-[#1f2124]' shadow='sm' withBorder radius='lg'>
				<Group>
					<Title className='font-sans font-medium'>News</Title>
				</Group>
			</Card>
		</Container>
	)
}

export default Feed
