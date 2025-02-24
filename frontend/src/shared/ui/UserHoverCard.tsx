import { IUser } from '@/shared/config/types/user.types'
import {
  ActionIcon,
  Blockquote,
  HoverCard,
  MantineSize,
  Text,
  TextProps,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { MessagesSquare, Quote, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { io } from 'socket.io-client'

import LumineAvatar from '../../shared/ui/LumineAvatar'
import { getSocket } from '../api/socket.service'
import { useAuth } from '../stores/user/useAuth'

interface props extends TextProps {
  user: IUser
  targetSize?: MantineSize | (string & {}) | undefined
}

export const UserHoverCard = ({
  user,
  targetSize = 'lg',
  ...textProps
}: props) => {
  const theme = useMantineTheme()

  const {
    user: { id },
  } = useAuth()
  const sendFriendRequest = () => {
    if (id) {
      console.log(id, user.id)
      const socket = getSocket(id)
      if (socket) {
        console.log(2)
        socket.emit(
          'sendFriendRequest',
          { receiverId: user.id },
          (response: any) => {
            if (!response.success) {
              // You might want to show this error to the user using a notification system
              console.error(response.error)
            }
          }
        )
      }
    }
  }

  const cancelFriendRequest = () => {
    const socket = getSocket(id)
    socket.emit('cancelFriendRequest', { receiverId: user.id })
  }

  return (
    <HoverCard shadow="xl" openDelay={700}>
      <HoverCard.Target>
        <Text
          href={`/profile/${user.username}`}
          component={Link}
          className="hover:underline cursor-pointer text-[#d9e4ed]"
          ml={-8}
          size={targetSize}
          fw={700}
          {...textProps}
        >
          {user.name} {user.surname}
        </Text>
      </HoverCard.Target>
      <HoverCard.Dropdown
        miw={400}
        className="flex flex-row gap-x-4 rounded-xl"
        style={{
          border: '1px solid rgba(255, 200, 100, 0.15)',
          backgroundColor: 'rgba(31, 33, 36, 0.8)',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 0 15px rgba(255, 184, 56, 0.1)',
        }}
      >
        <LumineAvatar
          size={50}
          url={user.userAvatar!}
          username={user.username}
        />
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <Title order={3}>
                {user.name} {user.surname}
              </Title>
              <Title mb={20} c="dimmed" order={4}>
                @{user.username}
              </Title>
            </div>
            <div className="flex flex-row gap-x-2">
              <ActionIcon
                color={theme.colors.myColor[0]}
                variant="outline"
                onClick={() => sendFriendRequest()}
              >
                <UserPlus size={20} />
              </ActionIcon>
              <ActionIcon
                color={theme.colors.myColor[0]}
                variant="outline"
                onClick={() => cancelFriendRequest()}
              >
                <MessagesSquare size={20} />
              </ActionIcon>
            </div>
          </div>
          <Blockquote
            maw={400}
            color={'#ffd37d'}
            iconSize={30}
            icon={<Quote size={16} />}
            className="pt-3 pl-5 whitespace-normal break-words"
            cite={user.name + ' ' + user.surname}
            styles={{
              icon: {
                border: '1px solid #ffd37d',
              },
            }}
          >
            <i>
              {user.bio === '' ? (
                'No bio yet :('
              ) : (
                <>
                  {user.bio.split('\n').map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </>
              )}
            </i>
          </Blockquote>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
