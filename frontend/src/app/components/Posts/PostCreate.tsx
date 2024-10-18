'use client'

import { ActionIcon, Card, Grid, Group, Textarea } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import {
	Camera,
	SendHorizontal,
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
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'

import { motion } from 'framer-motion'
import { createPost } from '@/lib/actions/createPost'
import { HeadingButton } from './HeadingButton'
interface IPostCreate {
	isGrid: boolean
}

const PostCreate: FC<IPostCreate> = ({ isGrid }) => {
	const { user } = useAuth()

	const [contentHeight, setContentHeight] = useState(100)
	const [styled, setStyled] = useState<boolean>(false)
	const rightSectionRef = useRef<HTMLButtonElement>(null)

	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Bold,
			Italic,
			Underline,
			Strike,
			Placeholder.configure({
				placeholder: "What's news, bro?",
				emptyEditorClass: 'is-editor-empty',
			}),
			Heading.configure({
				levels: [1, 2, 3],
			}),
		],
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const element = editor.options.element

			if (element) {
				setContentHeight(Math.max(100, element.scrollHeight))
			}
		},
		editorProps: {
			attributes: {
				class: '!outline-none !border-none',
			},
		},
	})

	const textRefLen = editor?.getText().length

	const ref = useClickOutside(() => {
		if (!styled) return

		if (ref.current) {
			setStyled(false)
			ref.current.style.border = '1px solid rgb(66,66,66)'
		}
	})
	const handleFocus = () => {
		editor?.chain().focus()
		if (ref.current) {
			setStyled(true)

			ref.current.style.border = '1px solid #ffd37d'
		}
	}

	const handleSend = async () => {
		const postContent = editor?.getHTML()
		console.log(postContent)
		if (postContent) {
			try {
				const data = await createPost({ content: postContent, User: user })
				console.log('seccs', data)
			} catch (err) {
				console.log(err)
			}
		}
	}

	if (!editor) return null

	console.log(editor.options.element.scrollHeight)
	if (!isGrid) {
		return (
			<motion.div
				onClick={() => {
					handleFocus()
				}}
				initial={{ height: 'auto' }}
				animate={{
					height: styled ? `${contentHeight + 40}px` : 'auto',
				}}
				transition={{ duration: 0.2 }}
				ref={ref}
				className='mb-[20px] !bg-[#1f2124] flex flex-col rounded-[1rem] shadow-lg border-[rgb(66,66,66)] border cursor-text'>
				<div className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}>
					<EditorContent
						className={`overflow-y-auto p-[16px] w-full !outline-none !border-none ${
							styled ? 'max-h-[500px]' : 'h-full'
						}`}
						editor={editor}
						color='white'
					/>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: styled ? 1 : 0 }}
						className={`${!styled ? 'hidden' : 'flex'} absolute bottom-0 left-0 p-4 gap-x-4`}>
						<HeadingButton editor={editor} level={1} />
						<HeadingButton editor={editor} level={2} />
						<HeadingButton editor={editor} level={3} />
						<ActionIcon
							onClick={() => editor.chain().focus().toggleBold().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('bold') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<BoldButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleItalic().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('italic') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<ItalicButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('underline') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<UnderlineButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleStrike().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('strike') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<StrikeButton size={14} strokeWidth={3} />
						</ActionIcon>
					</motion.div>
					<Group className='absolute bottom-0 right-0 p-4'>
						<ActionIcon
							disabled={typeof textRefLen !== 'undefined' && textRefLen > 0 ? false : true}
							className='transition-all'
							variant='transparent'
							color=''
							onClick={() => handleSend()}>
							<SendHorizontal size={22} />
						</ActionIcon>
					</Group>
				</div>
			</motion.div>
		)
	}
	return (
		// <Grid.Col span={7.5} className='px-0 pt-4'>
			<motion.div
				onClick={() => {
					handleFocus()
				}}
				initial={{ height: 'auto' }}
				animate={{
					height: styled ? `${contentHeight + 40}px` : 'auto',
				}}
				transition={{ duration: 0.2 }}
				ref={ref}
				className='mb-[20px] !bg-[#1f2124] flex flex-col rounded-[1rem] shadow-lg border-[rgb(66,66,66)] border cursor-text'>
				<div className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}>
					<EditorContent
						className={`overflow-y-auto p-[16px] w-full !outline-none !border-none ${
							styled ? 'max-h-[500px]' : 'h-full'
						}`}
						editor={editor}
						color='white'
					/>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: styled ? 1 : 0 }}
						className={`${!styled ? 'hidden' : 'flex'} absolute bottom-0 left-0 p-4 gap-x-4`}>
						<HeadingButton editor={editor} level={1} />
						<HeadingButton editor={editor} level={2} />
						<HeadingButton editor={editor} level={3} />
						<ActionIcon
							onClick={() => editor.chain().focus().toggleBold().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('bold') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<BoldButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleItalic().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('italic') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<ItalicButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('underline') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<UnderlineButton size={14} strokeWidth={3} />
						</ActionIcon>
						<ActionIcon
							onClick={() => editor.chain().focus().toggleStrike().run()}
							ref={rightSectionRef}
							className='h-auto transition-all'
							color={editor.isActive('strike') ? '#ffd37d' : '#A0A0A0'}
							variant={'outline'}>
							<StrikeButton size={14} strokeWidth={3} />
						</ActionIcon>
					</motion.div>
					<Group className='absolute bottom-0 right-0 p-4'>
						<ActionIcon
							disabled={typeof textRefLen !== 'undefined' && textRefLen > 0 ? false : true}
							className='transition-all'
							variant='transparent'
							color=''
							onClick={() => handleSend()}>
							<SendHorizontal size={22} />
						</ActionIcon>
					</Group>
				</div>
			</motion.div>
		
	)
}
export default PostCreate
