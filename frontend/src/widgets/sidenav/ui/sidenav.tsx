'use client'
import { useAuth } from '@/shared/stores/user/useAuth'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { Group, Stack, Text, Title } from '@mantine/core'
import {
	CircleUserRound,
	House,
	MessageCircle,
	Settings,
	UsersRound,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SideNavItem } from './sidenav-item'

export const SideNav = () => {
	const {
		user: { userAvatar, surname, name, username },
	} = useAuth()
	const pathname = usePathname()!.substring(1)
	const [index, setIndex] = useState<string>('feed')
	useEffect(() => {
		setIndex(pathname.split('/')[0])
	}, [pathname])

	return (
		<nav
			className={`flex flex-col px-4 pt-4 pb-3 w-[270px] rounded-xl fixed bg-[rgba(31,33,36,0.7)] shadow-[0px_64px_64px_-32px_rgba(41,15,0,0.56)] backdrop-blur-[80px] border border-[rgba(126,126,126,0.15)]`}
		>
			<Group>
				<LumineAvatar
					size={50}
					url={userAvatar}
					username={`${name} ${surname}`}
				/>
				<Stack justify='center' className='gap-y-1'>
					<Text c='dimmed' className='text-[11px]'>
						NEWBIE
					</Text>
					<Title className={`text-[20px] font-medium`}>
						{name} {surname}
					</Title>
				</Stack>
			</Group>
			<div
				className='w-full h-[1px] my-3 '
				style={{
					background:
						'radial-gradient(50% 50% at 50% 50%, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
					opacity: 0.32,
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				}}
			/>
			<Stack className='gap-y-1'>
				<Text className='px-4 text-[11px] font-medium' c={'dimmed'}>
					MAIN
				</Text>
				<SideNavItem
					title='Profile'
					href={`/profile/${username}`}
					Icon={CircleUserRound}
					onClickEvent={() => setIndex(`profile`)}
					isActive={index === 'profile'}
				/>
				<SideNavItem
					title='Feed'
					href={'/feed'}
					Icon={House}
					onClickEvent={() => setIndex(`feed`)}
					isActive={index === 'feed'}
				/>
				<SideNavItem
					title='Messages'
					href={'/messages'}
					Icon={MessageCircle}
					onClickEvent={() => setIndex(`messages`)}
					isActive={index === 'messages'}
				/>
				<SideNavItem
					title='Friends'
					href={'/friends'}
					Icon={UsersRound}
					onClickEvent={() => setIndex(`friends`)}
					isActive={index === 'friends'}
				/>
			</Stack>
			<div
				className='w-full h-[1px] my-3'
				style={{
					background:
						'radial-gradient(50% 50% at 50% 50%, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
					opacity: 0.32,
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				}}
			/>

			<Stack className='gap-y-5 pl-4'>
				<Text className='text-[11px] font-medium' c={'dimmed'}>
					GO - TO PERSONS
				</Text>
				<Group className='text-gray-400 hover:text-gray-300 cursor-pointer'>
					<LumineAvatar
						size={30}
						url={userAvatar}
						username={`${name} ${surname}`}
					/>
					<Text className='text-base'>
						{name} {surname}
					</Text>
				</Group>
				<Group className='text-gray-400 hover:text-gray-300 cursor-pointer'>
					<LumineAvatar
						size={30}
						url={userAvatar}
						username={`${name} ${surname}`}
					/>
					<Text className='text-base'>
						{name} {surname}
					</Text>
				</Group>
				<Group className='text-gray-400 hover:text-gray-300 cursor-pointer'>
					<LumineAvatar
						size={30}
						url={userAvatar}
						username={`${name} ${surname}`}
					/>
					<Text className='text-base'>
						{name} {surname}
					</Text>
				</Group>
			</Stack>
			<div
				className='w-full h-[1px] my-3'
				style={{
					background:
						'radial-gradient(50% 50% at 50% 50%, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
					opacity: 0.32,
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				}}
			/>

			<Stack className='gap-y-1'>
				<Text className='px-4 text-[11px] font-medium' c={'dimmed'}>
					MISC
				</Text>
				<SideNavItem
					title='Settings'
					href={'/settings/profile'}
					Icon={Settings}
					onClickEvent={() => setIndex(`settings`)}
					isActive={index === 'settings'}
				/>
			</Stack>
		</nav>
	)
}
