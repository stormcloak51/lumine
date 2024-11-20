'use client'

import { ActionIcon, Group, Kbd, Tooltip } from '@mantine/core'
import { useClickOutside, useOs } from '@mantine/hooks'
import { EditorContent } from '@tiptap/react'
import {
	Bold as BoldButton,
	Italic as ItalicButton,
	SendHorizontal,
	Strikethrough as StrikeButton,
	Underline as UnderlineButton,
} from 'lucide-react'
import { FC, useState } from 'react'

import { motion } from 'framer-motion'
import { HeadingButton } from './heading-button'
import { getHotkeyHandler } from '@mantine/hooks'
import { useSendPost } from '../model/useSendPost'
import { useEditor } from '../model/useEditor'

interface IPostCreate {
	content?: string
	onChange?: (newContent: string) => void
}

export const PostCreate: FC<IPostCreate> = ({ content, onChange }) => {
	const os = useOs()
	const [contentHeight, setContentHeight] = useState(100)
	const [styled, setStyled] = useState<boolean>(false)

	const editor = useEditor({
		content: content ? content : null,
		onCreate: () => {
			if (content) handleFocus()
		},
		onUpdate: ({ editor }) => {
			const element = editor.options.element
			if (element) setContentHeight(element.clientHeight)
			if (onChange) onChange(editor.getHTML())
		},
		onFocus: ({ editor }) => {
			if (editor) {
				setContentHeight(editor.options.element.clientHeight)
			}
		},
	})

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

	const {handleSend, contentLength} = useSendPost(editor)

	if (!editor) return null

	return (
		<motion.div
			onKeyDown={getHotkeyHandler([['mod+Enter', handleSend]])}
			onClick={() => {
				handleFocus()
			}}
			initial={{ height: 'auto' }}
			animate={{
				height: styled ? `${contentHeight + 60}px` : 'auto',
			}}
			transition={{ duration: 0.2 }}
			ref={ref}
			className='mb-[20px] !bg-[#1f2124] flex flex-col rounded-[1rem] shadow-lg border-[rgb(66,66,66)] border cursor-text'>
			<div className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}>
				<EditorContent
					className={`overflow-y-auto p-[16px] pr-[50px] w-full !outline-none !border-none ${
						styled ? 'h-auto' : 'h-full'
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
						className='h-auto transition-all'
						color={editor.isActive('bold') ? '#ffd37d' : '#A0A0A0'}
						variant={'outline'}>
						<BoldButton size={14} strokeWidth={3} />
					</ActionIcon>
					<ActionIcon
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className='h-auto transition-all'
						color={editor.isActive('italic') ? '#ffd37d' : '#A0A0A0'}
						variant={'outline'}>
						<ItalicButton size={14} strokeWidth={3} />
					</ActionIcon>
					<ActionIcon
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className='h-auto transition-all'
						color={editor.isActive('underline') ? '#ffd37d' : '#A0A0A0'}
						variant={'outline'}>
						<UnderlineButton size={14} strokeWidth={3} />
					</ActionIcon>
					<ActionIcon
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className='h-auto transition-all'
						color={editor.isActive('strike') ? '#ffd37d' : '#A0A0A0'}
						variant={'outline'}>
						<StrikeButton size={14} strokeWidth={3} />
					</ActionIcon>
				</motion.div>
				{!content && (
					<Group className='absolute bottom-0 right-0 p-4'>
						<Tooltip
							openDelay={200}
							transitionProps={{ transition: 'rotate-left', duration: 300 }}
							color='#1f2124'
							className='text-white'
							label={
								os === 'macos' ? (
									<>
										<Kbd>⌘</Kbd> + <Kbd>Enter</Kbd> - to send a post
									</>
								) : os === 'windows' ?(
									<>
										<Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> - to send a post
									</>
								) : (
									''
								)
							}>
							<button
								onClick={handleSend}
								disabled={typeof contentLength !== 'undefined' && contentLength > 0 ? false : true}>
								<SendHorizontal
									className={`transition-all ${
										typeof contentLength !== 'undefined' && contentLength > 0
											? `text-[#ffd37d] animate-pulse`
											: `text-[rgb(66,66,66)] animate-none`
									}`}
									size={22}
								/>
							</button>
						</Tooltip>
					</Group>
				)}
			</div>
		</motion.div>
	)
}
