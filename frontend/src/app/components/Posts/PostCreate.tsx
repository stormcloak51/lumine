'use client'
import { createPost } from '@/lib/actions/posts'
import { ActionIcon, Card, Group, Textarea } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { Camera, SendHorizontal, Video } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import LumineAvatar from '../LumineAvatar'

const PostCreate: FC = () => {
	const [postContent, setPostContent] = useState<string>('')
	const [minRows, setMinRows] = useState(1)
	const [styled, setStyled] = useState(false)
	const rightSectionRef = useRef<HTMLDivElement>(null)

	const ref = useClickOutside(() => {
		setStyled(!styled)
		setMinRows(1)
		if (ref.current && rightSectionRef.current) {
			rightSectionRef.current.children[2].children[0].children[0].setAttribute(
				'style',
				'display: none',
			)
			ref.current.style.border = '1px solid rgb(66,66,66)'
			rightSectionRef.current.children[0].setAttribute('style', 'stroke: ')
			rightSectionRef.current.children[1].setAttribute('style', 'stroke: ')
		}
	})
	const handleFocus = () => {
		if (ref.current && rightSectionRef.current) {
			ref.current.style.border = '1px solid #ffd37d'
			rightSectionRef.current.children[0].setAttribute('style', 'stroke: #ffd37d')
			rightSectionRef.current.children[1].setAttribute('style', 'stroke: #ffd37d')
			rightSectionRef.current.children[2].children[0].children[0].setAttribute(
				'style',
				'display: block',
			)
			setMinRows(3)
		}
	}

	const handleSend = () => {
		if (postContent) {
			createPost({ content: postContent })
		}
	}
	return (
		<Card
			className='!bg-[#1f2124] mb-[20px] transition-all flex flex-row'
			withBorder
			style={{
				transition: 'height 0.3s ease-in-out',
			}}
			shadow='sm'
			radius='lg'
			ref={ref}>
			<Textarea
				// ref={ref}
				size='md'
				radius='lg'
				variant='unstyled'
				className='w-full text-[14px] px-[15px] relative'
				onFocus={handleFocus}
				autosize
				value={postContent}
				onChange={e => setPostContent(e.target.value)}
				minRows={minRows}
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
			/>
			<Group
				ref={rightSectionRef}
				className='
			w-[100px] flex items-center justify-center flex-row gap-2 relative'>
				<Camera className='transition-all absolute top-0 right-[30px]' />
				<Video className='transition-all absolute top-0 right-0' />
				<ActionIcon
					onClick={() => handleSend()}
					variant='transparent'
					className='bg-none w-full h-full'>
					<SendHorizontal className='stroke-[#ffcb64] hidden absolute bottom-0 right-0 transform' />
				</ActionIcon>
			</Group>
		</Card>
	)
}

export default PostCreate
