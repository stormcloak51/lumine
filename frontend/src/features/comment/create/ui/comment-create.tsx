'use client'

import { randomCommentPhrases } from '@/shared/helpers/randomPhrases'
import { useClickOutside } from '@mantine/hooks'
import '@mantine/tiptap/styles.css'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { motion } from 'framer-motion'
import { SendHorizonal } from 'lucide-react'
import { useState } from 'react'

export const CommentCreate = ({
  onSubmit,
  postId,
  commentId,
  cl = '',
}: {
  postId: number
  commentId?: number
  cl?: string
  onSubmit: (data: {
    content: string
    postId: number
    commentId?: number
  }) => void
}) => {
  const [isActive, setActive] = useState(false)

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      History,
      Paragraph,
      Placeholder.configure({ placeholder: randomCommentPhrases() }),
    ],
    content: '',
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class: '!outline-none !border-none',
      },
    },
  })

  const rootRef = useClickOutside(() => {
    if (!isActive) return

    if (rootRef.current) {
      setActive(false)
      rootRef.current.style.border = '1px solid rgb(66,66,66)'
    }
  })

  if (!editor) {
    return null
  }

  const handleFocus = () => {
    editor?.chain().focus()
    if (rootRef.current) {
      setActive(true)

      rootRef.current.style.border = '1px solid #ffd37d'
    }
  }

  return (
    <motion.div
      onClick={() => {
        handleFocus()
      }}
      initial={{ height: 'auto' }}
      animate={{
        height: isActive ? 'auto' : 'auto',
      }}
      transition={{ duration: 0.3 }}
      ref={rootRef}
      className={`'!bg-[#1f2124] flex flex-col rounded-[1rem] relative border-[rgb(66,66,66)] border cursor-text' ${cl}`}
      style={{
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
      }}
    >
      {/* <div className={`relative w-full h-full ${!styled ? 'flex items-center' : ''}`}> */}
      <EditorContent
        className={`p-[12px] pr-[50px] w-full !outline-none !border-none ${
          isActive ? 'h-auto' : 'h-auto'
        }`}
        editor={editor}
        color="white"
      />
      <button
        onClick={() => {
          onSubmit({
            content: editor.getHTML(),
            postId,
            commentId: commentId,
          })
          editor.commands.clearContent()
        }}
        disabled={editor.getText().length === 0}
        className="ml-auto absolute right-3 bottom-[12px]"
      >
        <SendHorizonal
          color={editor.getText() ? '#ffd37d' : 'rgb(66, 66, 66)'}
        />
      </button>
    </motion.div>
  )
}
