'use client'
import { Divider } from '@mantine/core'
import { SettingsSidenavItem } from './settings-sidenav-item'
import { FaPalette, FaUser } from 'react-icons/fa6'
import { BiSolidLock } from 'react-icons/bi'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export const SettingsSidenav = () => {
	const pathname = usePathname()?.split('/')[2]
	const [activePage, setActivePage] = useState(pathname)

	return (
		<div className='flex gap-x-3'>
			<aside className='flex flex-col gap-y-1'>
				<SettingsSidenavItem
					c={'#29a2f3'}
					Icon={FaUser}
					title='Profile'
					isActive={activePage === 'profile'}
					setActive={() => setActivePage('profile')}
				/>
				<SettingsSidenavItem
					c={'#32cd32'}
					Icon={FaPalette}
					title='Appearance'
					isActive={activePage === 'appearance'}
					setActive={() => setActivePage('appearance')}
				/>
				<SettingsSidenavItem
					c={'#ff0038'}
					Icon={BiSolidLock}
					title='Privacy'
					isActive={activePage === 'privacy'}
					setActive={() => setActivePage('privacy')}
				/>
			</aside>
			<Divider orientation='vertical' size={0.5} color={'rgb(66,66,66)'} />
		</div>
	)
}