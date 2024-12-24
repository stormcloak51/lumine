'use client'

import { ActionIcon, Kbd, Tooltip } from '@mantine/core'
import { useClickOutside, useOs } from '@mantine/hooks'
import { getHotkeyHandler } from '@mantine/hooks'
import { EditorContent } from '@tiptap/react'
import { motion } from 'framer-motion'
import {
  Bold as BoldButton,
  Italic as ItalicButton,
  SendHorizontal,
  Strikethrough as StrikeButton,
  Underline as UnderlineButton,
} from 'lucide-react'
import { FC, useEffect, useState } from 'react'

import { useDraft } from '../model/useDraft'
import { useEditor } from '../model/useEditor'
import { useSendPost } from '../model/useSendPost'
import { HeadingButton } from './heading-button'
import { Loading } from './loading'
import { MediaContent } from './media-content'

interface IPostCreate {
  content?: string
}

export const PostCreate: FC<IPostCreate> = ({ content }) => {
  const os = useOs()
  const [contentHeight, setContentHeight] = useState(100)
  const [styled, setStyled] = useState<boolean>(false)
  const {
    useDraftDebounce: upsertDraft,
    data: draftData,
    isLoading: isDraftLoading,
  } = useDraft()

  const editor = useEditor({
    content: content ? content : '',
    onCreate: () => {
      if (content) {
        handleFocus()
      }
    },
    onUpdate: ({ editor }) => {
      const element = editor.options.element
      if (element) setContentHeight(element.clientHeight)
      upsertDraft(editor.getHTML())
    },
    onFocus: ({ editor }) => {
      if (editor) {
        setContentHeight(editor.options.element.clientHeight)
      }
    },
  })

  useEffect(() => {
    if (draftData?.content && editor) {
      editor.commands.setContent(draftData?.content)
    }
  }, [draftData?.content, editor])

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

  const handleSend = () => {
    if (!editor) return
    mutation.mutate(editor.getHTML(), {
      onSuccess: () => {
        editor.commands.clearContent()
      },
    })
  }

  const mutation = useSendPost()
  if (isDraftLoading || !editor) return <Loading />
  return (
    <motion.div
      onKeyDown={getHotkeyHandler([['mod+Enter', handleSend]])}
      onClick={() => {
        handleFocus()
      }}
      initial={{ height: 'auto' }}
      animate={{
        height: styled ? `${contentHeight + 80}px` : 'auto',
      }}
      transition={{ duration: 0.2 }}
      ref={ref}
      key={draftData?.content}
      className="mb-[20px] !bg-[#1f2124] flex flex-col rounded-[1rem] shadow-lg border-[rgb(66,66,66)] border cursor-text"
    >
      <div
        className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}
      >
        <EditorContent
          className={`overflow-y-auto p-[16px] pr-[100px] w-full !outline-none !border-none ${
            styled ? 'h-auto' : 'h-full'
          }`}
          editor={editor}
          color="white"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: styled ? 1 : 0 }}
          className={`${!styled ? 'hidden' : 'flex'} absolute bottom-0 left-0 p-4 gap-x-4`}
        >
          <HeadingButton editor={editor} level={1} />
          <HeadingButton editor={editor} level={2} />
          <HeadingButton editor={editor} level={3} />
          <ActionIcon
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-auto transition-all"
            color={editor.isActive('bold') ? '#ffd37d' : '#A0A0A0'}
            variant={'outline'}
          >
            <BoldButton size={14} strokeWidth={3} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-auto transition-all"
            color={editor.isActive('italic') ? '#ffd37d' : '#A0A0A0'}
            variant={'outline'}
          >
            <ItalicButton size={14} strokeWidth={3} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-auto transition-all"
            color={editor.isActive('underline') ? '#ffd37d' : '#A0A0A0'}
            variant={'outline'}
          >
            <UnderlineButton size={14} strokeWidth={3} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="h-auto transition-all"
            color={editor.isActive('strike') ? '#ffd37d' : '#A0A0A0'}
            variant={'outline'}
          >
            <StrikeButton size={14} strokeWidth={3} />
          </ActionIcon>
        </motion.div>
        {!content && (
          <div className="flex gap-x-4 items-baseline absolute bottom-0 right-0 p-4">
            <MediaContent isFocused={styled} />
            <Tooltip
              openDelay={200}
              transitionProps={{ transition: 'rotate-left', duration: 300 }}
              color="#1f2124"
              className="text-white"
              label={
                os === 'macos' ? (
                  <>
                    <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd> - to send a post
                  </>
                ) : os === 'windows' ? (
                  <>
                    <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> - to send a post
                  </>
                ) : (
                  ''
                )
              }
            >
              <button
                onClick={handleSend}
                disabled={!editor.getText() || editor.getText().length === 0}
              >
                <SendHorizontal
                  className={`transition-all ${!(!editor.getText() || editor.getText().length === 0)
                      ? `text-[#ffd37d] animate-pulse`
                      : `text-[rgb(66,66,66)] animate-none`
                  }`}
                  size={22}
                />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </motion.div>
  )
}
