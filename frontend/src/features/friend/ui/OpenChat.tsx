import { ActionIcon } from '@mantine/core'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const OpenChat = ({ friendId }: { friendId: string }) => {
  const router = useRouter()

  const handleOpenChat = () => {
    router.push(`/chats?friendId=${friendId}`)
  }
  return (
    <ActionIcon
      size={28}
      onClick={handleOpenChat}
      className="bg-blue-600 bg-blue-400/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 p-1"
    >
      <Pen
        className="w-7 h-7 hover:text-blue-500/80 transition-all duration-300"
        color="currentColor"
      />
    </ActionIcon>
  )
}
