import { IUser } from '@/shared/config/types/user.types'
import { ActionIcon, Avatar, Menu, Text } from '@mantine/core'
import { Plus } from 'lucide-react'

export const CreateChat = ({
  onSelect,
  friendsWithoutChat,
  friendsCount,
}: {
  onSelect: (friendId: string) => void
  friendsWithoutChat: IUser[]
  friendsCount: number
}) => {
  return (
    <Menu shadow="md" width={220} position="top-end">
      <Menu.Target>
        <ActionIcon
          className="bg-primary-600 hover:bg-primary-700 transition-colors"
          size="xl"
          radius="xl"
          color="blue"
          variant="filled"
        >
          <Plus size={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className="bg-[#2a2c31] border-gray-700">
        <Menu.Label className="text-gray-400">Начать новый чат</Menu.Label>
        <div className="max-h-60 overflow-y-auto">
          {friendsWithoutChat.length > 0 ? (
            friendsWithoutChat.map((friend) => (
              <Menu.Item
                onClick={() => onSelect(friend.id)}
                key={friend.id}
                leftSection={
                  <Avatar src={friend.userAvatar} radius="xl" size="sm" />
                }
                className="hover:bg-[#3a3d42]"
              >
                <Text size="sm" fw={500}>
                  {friend.name || friend.username} {friend.surname}
                </Text>
              </Menu.Item>
            ))
          ) : friendsCount == 0 ? (
            <Text size="sm" className="py-2 px-4 text-gray-400 italic">
              У вас пока нет друзей
            </Text>
          ) : (
            <Text size="sm" className="py-2 px-4 text-gray-400 italic">
              Нет данных
            </Text>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}
