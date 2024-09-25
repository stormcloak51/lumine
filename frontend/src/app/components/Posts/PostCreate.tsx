'use client'
import { Card, Textarea, Group, ActionIcon } from '@mantine/core'
import { Camera, SendHorizontal, Video } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import LumineAvatar from '../LumineAvatar'
import { useClickOutside } from '@mantine/hooks'

const PostCreate: FC = () => {
	const [minRows, setMinRows] = useState(1)
	const [styled, setStyled] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)
	const rightSectionRef = useRef<HTMLDivElement>(null)

	const ref = useClickOutside(() => {
		setStyled(!styled)
		setMinRows(1)
		if (cardRef.current && rightSectionRef.current) {
			rightSectionRef.current.children[2].children[0].children[0].setAttribute('style', 'display: none')
			cardRef.current.style.border = '1px solid rgb(66,66,66)'
			rightSectionRef.current.children[0].setAttribute('style', 'stroke: ')
			rightSectionRef.current.children[1].setAttribute('style', 'stroke: ')
		}
	})
	const handleFocus = () => {
		if (cardRef.current && rightSectionRef.current) {
			cardRef.current.style.border = '1px solid #ffd37d'
			rightSectionRef.current.children[0].setAttribute('style', 'stroke: #ffd37d')
			rightSectionRef.current.children[1].setAttribute('style', 'stroke: #ffd37d')
			rightSectionRef.current.children[2].children[0].children[0].setAttribute('style', 'display: block')
			setMinRows(3)
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
			ref={(node) => {
				cardRef.current = node
				if (typeof clickOutsideRef === 'function') clickOutsideRef(node)
			}}>
			<Textarea
				ref={ref}
				size='md'
				radius='lg'
				variant='unstyled'
				className='w-full text-[14px] px-[15px] relative'
				onFocus={handleFocus}
				autosize
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
				<ActionIcon variant='transparent'>
					<SendHorizontal className='stroke-[#ffcb64] hidden absolute bottom-0 right-0' />
				</ActionIcon>
			</Group>
		</Card>
	)
}

export default PostCreate
