'use client'
import {
	Card,
	Title,
	Group,
	Container,
	Input,
	Avatar,
	Textarea,
	MantineComponent,
} from '@mantine/core'
import { NextPage } from 'next'

import { useRef } from 'react'

const Feed: NextPage = ({}) => {
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const handleFocus = () => {
		console.log(inputRef.current?.attributes)
	}

	return (
		<Container className='ml-[290px] pl-[20px] box-border flex flex-col'>
			<Card className='!bg-[#1f2124] mb-[20px] border-[#ffcb64] border-[1px]' shadow='sm' radius='lg' classNames={classes}>
				<Textarea
					ref={inputRef}
					size='md'
					radius='lg'
					variant='unstyled'
					className='w-[500px] !h-full text-[14px] pl-[15px]'
					onFocus={handleFocus}
					autosize
					minRows={1}
					placeholder="What's news?"
					leftSection={
						<Avatar size={46} src='https://i.pravatar.cc/300' className='mr-[25px]'>
							SC
						</Avatar>
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
