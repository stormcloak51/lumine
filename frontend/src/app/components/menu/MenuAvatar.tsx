'use client'
import { Menu, rem } from '@mantine/core'
import LumineAvatar from '../LumineAvatar'
import { FC } from 'react'
import { Aperture, LogOut, Settings } from 'lucide-react'
import { useAuth } from '@/lib/actions/state'
import { authService } from '@/services/auth.service'

interface IMenuAvatar {
	size: number
}

export const MenuAvatar: FC<IMenuAvatar> = ({ size }) => {
	const {user: {user: {id}}} = useAuth()

	const handleLogout = async () => {
		try {
			await authService.logout()
			window.location.href = 'auth/login'
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<div className='flex justify-center p-0 m-0'>
					<LumineAvatar size={size} hasStories={false} shouldRedirect={false} />
				</div>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Application</Menu.Label>
				<Menu.Item leftSection={<Settings style={{ width: rem(14), height: rem(14) }} />}>
					Settings
				</Menu.Item>
				<Menu.Item leftSection={<Aperture style={{ width: rem(14), height: rem(14) }} />}>
					Gallery
				</Menu.Item>

				<Menu.Divider />

				<Menu.Label>Danger zone</Menu.Label>
				<Menu.Item leftSection={<LogOut style={{ width: rem(14), height: rem(14) }} />} onClick={handleLogout}>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
