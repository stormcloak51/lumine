'use client'

import { authService } from '@/app/(pages)/(auth)/services/auth.service'
import { useAuth } from '@/shared/stores/user/useAuth'
import { useUser } from '@/shared/stores/user/user.store'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { Menu, rem } from '@mantine/core'
import { Aperture, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface props {
  size: number
}

export const UserMenu: FC<props> = ({ size }) => {
  const {
    user: { userAvatar, username },
  } = useAuth()
  const { deleteUser } = useUser()

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
      deleteUser()
      router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="flex justify-center p-0 m-0">
          <LumineAvatar
            username={username}
            url={userAvatar}
            size={size}
            hasStories={false}
            shouldRedirect={false}
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<Settings style={{ width: rem(14), height: rem(14) }} />}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<Aperture style={{ width: rem(14), height: rem(14) }} />}
        >
          Gallery
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<LogOut style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
