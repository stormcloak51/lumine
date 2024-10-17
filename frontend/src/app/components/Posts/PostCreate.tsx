'use client'

import { postService } from '@/services/post.service'
import { ActionIcon, Button, Card, Flex, Grid, Group, Textarea, Title } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import {
	Camera,
	MessageSquare,
	MessagesSquare,
	SendHorizontal,
	UserPlus,
	Video,
	Bold as BoldButton,
	Italic as ItalicButton,
	Underline as UnderlineButton,
	Strikethrough as StrikeButton,
} from 'lucide-react'
import { FC, useRef, useState } from 'react'
import LumineAvatar from '../LumineAvatar'
import { useAuth } from '@/lib/actions/state'
// import Tiptap from '../Tiptap'
import { EditorContent, useEditor } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'

import Text from '@tiptap/extension-text'
import { motion } from 'framer-motion'
interface IPostCreate {
	isGrid: boolean
	currId: string
}

const PostCreate: FC<IPostCreate> = ({ isGrid, currId = undefined }) => {
	const {
		user: { user: user },
	} = useAuth()

	// const [postContent, setPostContent] = useState<string>('')
	const [styled, setStyled] = useState<boolean>(false)
	const rightSectionRef = useRef<HTMLButtonElement>(null)
	const isJoined = useRef(false)

	const editor = useEditor({
		extensions: [Document, Paragraph, Text, Bold, Italic, Underline,  Strike,Placeholder.configure({ placeholder: "What's news, bro?", emptyEditorClass: 'is-editor-empty' })],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: '!outline-none !border-none prose-sm',
			},
		},
	})

	const textRefLen = editor?.getText().length

	const ref = useClickOutside(() => {
		if (!isJoined.current) return

		if (ref.current) {
			setStyled(false)
			isJoined.current = false
			ref.current.style.border = '1px solid rgb(66,66,66)'
		}
	})
	const handleFocus = () => {
		isJoined.current = true
		editor?.chain().focus()
		if (ref.current) {
			setStyled(true)

			ref.current.style.border = '1px solid #ffd37d'
		}
	}

	const handleSend = async () => {
		const postContent = editor?.getHTML()
		if (postContent) {
			try {
				const data = await postService.create({ content: postContent, User: user })
				console.log('seccs', data)
			} catch (err) {
				console.log(err)
			}
		}
	}

	if (!editor) return null

	if (currId !== user?.id && typeof currId !== 'undefined') {
		return (
			<Grid.Col span={7.5} className='px-0 pt-4 '>
				<Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] p-[16px] py-[12px]'>
					<Title order={3} className='mb-4'>
						Actions
					</Title>
					<div className='flex justify-start gap-x-4 items-center'>
						<Button
							leftSection={<UserPlus size={20} />}
							className='text-[16px] font-sans'
							color={'#ffd37d'}
							variant={'outline'}>
							Follow
						</Button>
						<Button
							className='text-[16px] font-sans'
							color={'#ffd37d'}
							variant={'outline'}
							leftSection={<MessageSquare size={20} />}>
							Write a message
						</Button>
						<Button
							className='text-[16px] font-sans'
							color={'#ffd37d'}
							variant={'outline'}
							leftSection={<MessagesSquare size={20} />}>
							Add to chat
						</Button>
					</div>
				</Card>
			</Grid.Col>
		)
	}

	if (!isGrid) {
		return (
			<motion.div
				onClick={() => {
					handleFocus()
				}}
				initial={{ height: 'auto' }}
				animate={{ height: styled ? '150px' : typeof textRefLen !== 'undefined' && textRefLen > 15 ? '150px' : '58px' }}
				ref={ref}
				className='mb-[20px] !bg-[#1f2124] flex flex-col rounded-[1rem] shadow-lg border-[rgb(66,66,66)] border cursor-text'>
				<div className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}>
					{/* Editor content */}
					<EditorContent
						className={`overflow-y-auto p-[16px] w-full !outline-none !border-none ${styled ? 'h-4/6' : 'h-full'}`}
						editor={editor}
						color='white'
					/>

					{/* Flex container with Button positioned in the bottom-left corner */}
					<Flex className={`${!isJoined.current ? 'hidden' : 'flex'} absolute bottom-0 left-0 p-4 gap-x-4`}>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleBold().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('bold') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<BoldButton size={14} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleItalic().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('italic') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<ItalicButton size={14} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('underline') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<UnderlineButton size={14} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleStrike().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('strike') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<StrikeButton size={14} />
						</ActionIcon>
					</Flex>
					<Group className='absolute bottom-0 right-0 p-4'>
						<ActionIcon
							disabled={typeof textRefLen !== 'undefined' && textRefLen > 0 ? false : true}
							className='transition-all'
							variant='transparent'
							color=''
							onClick={() => handleSend()}
						>
							<SendHorizontal size={22} />
						</ActionIcon>
					</Group>
				</div>
			</motion.div>
		)
	}
	return (
		<Grid.Col span={7.5} className='px-0 pt-4'>
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
					// minRows={minRows}
					placeholder="What's news?"
					leftSection={
						<LumineAvatar
							size={38}
							src='https://i.pravatar.cc/300'
							className='mr-[35px]'
							position={'absolute'}
							hasStories={true}
							url={user?.userAvatar}
							username={user?.username}
						/>
					}
				/>
				<Group
					// ref={rightSectionRef}
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
		</Grid.Col>
	)
}
export default PostCreate
