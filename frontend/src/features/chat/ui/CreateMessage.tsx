'use client'

import { ActionIcon, TextInput } from '@mantine/core'
import { Send } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'

export const CreateMessage = ({
  onSend,
}: {
  onSend: (message: string) => void
}) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage) {
      onSend(trimmedMessage)
      setMessage('')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent adding a new line
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <TextInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow"
        placeholder="Type a message..."
        radius="xl"
        size="md"
        styles={{
          input: {
            backgroundColor: '#3a3f45', // Darker input background
            borderColor: '#4a4e54', // Subtle border
            color: 'white',
            '&::placeholder': {
              color: '#8f96a0', // Lighter placeholder text
            },
          },
        }}
      />
      <ActionIcon
        onClick={handleSend}
        size="lg"
        radius="xl"
        variant="filled"
        color="blue"
        disabled={!message.trim()}
      >
        <Send size={20} />
      </ActionIcon>
    </div>
  )
}
