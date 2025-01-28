import { useFriendship } from '@/shared/hooks/useFriendship'
import { Button, Popover, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export const FriendRequests = () => {
  const { requests, acceptFriendRequest } = useFriendship()
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set())

  const handleAcceptRequest = async (request: any) => {
    setAnimatingIds((prev) => new Set(prev).add(request.id))

    try {
      await acceptFriendRequest(request.id)

      notifications.show({
        title: 'Friend Request Accepted',
        message: `You are now friends with ${request.sender.name} ${request.sender.surname}`,
        color: 'yellow',
        icon: <Check size={16} />,
      })
    } catch (error) {
      setAnimatingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(request.id)
        return newSet
      })
      console.error(error)
      notifications.show({
        title: 'Error',
        message: 'Failed to accept friend request',
        color: 'red',
      })
    }
  }

  return (
    <Popover
      width={360}
      shadow="md"
      withArrow
      overlayProps={{
        zIndex: 20,
        blur: '8px',
      }}
      zIndex={21}
    >
      <Popover.Target>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity" onClick={() => notifications.show({
          message: 'helo'
        })}>
          <Bell size={24} className="stroke-[#ffd37d]" />
          {requests.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#ffd37d] text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
              {requests.length}
            </div>
          )}
        </div>
      </Popover.Target>

      <Popover.Dropdown className="rounded-xl bg-[#1f1f1f] border border-[#ffd37d]/20 p-4 space-y-4">
        <Text className="text-[#ffd37d] font-semibold text-lg mb-4">
          Friend Requests
        </Text>

        {requests.length === 0 ? (
          <Text className="text-gray-400 text-center py-4">
            No pending friend requests
          </Text>
        ) : (
          <AnimatePresence>
            {requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ x: 0, opacity: 1 }}
                animate={{
                  x: animatingIds.has(request.id) ? 400 : 0,
                  opacity: animatingIds.has(request.id) ? 0 : 1,
                }}
                exit={{ x: 400, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-[#ffd37d]/10 hover:border-[#ffd37d]/20 transition-colors"
              >
                <div className="flex items-center gap-x-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={request.sender.userAvatar}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-[#ffd37d]/20"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Text className="text-[#ffd37d] font-semibold">
                      {request.sender.name} {request.sender.surname}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      @{request.sender.username}
                    </Text>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 ml-4">
                  <Button
                    className="bg-[#ffd37d] hover:bg-[#ffbe45] text-black font-medium px-4 py-1 text-sm transition-colors"
                    size="xs"
                    onClick={() => handleAcceptRequest(request)}
                    disabled={animatingIds.has(request.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-transparent border border-[#ffd37d]/30 hover:border-[#ffd37d]/60 text-[#ffd37d] font-medium px-4 py-1 text-sm transition-colors"
                    size="xs"
                    disabled={animatingIds.has(request.id)}
                  >
                    Decline
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Popover.Dropdown>
    </Popover>
  )
}
