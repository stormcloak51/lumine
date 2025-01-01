'use client'

import { ActionIcon } from '@mantine/core'
import { Editor } from '@tiptap/react'
import { Heading1, Heading2, Heading3 } from 'lucide-react'

export const HeadingButton = ({
  editor,
  level,
}: {
  editor: Editor
  level: 1 | 2 | 3
}) => {
  const Icon = level === 1 ? Heading1 : level === 2 ? Heading2 : Heading3

  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level }).run()
  }

  return (
    <ActionIcon
      onClick={handleClick}
      className="h-auto transition-all"
      color={editor.isActive('heading', { level }) ? '#ffd37d' : '#A0A0A0'}
      variant={'outline'}
    >
      <Icon size={14} strokeWidth={3} />
    </ActionIcon>
  )
}
