'use client'
import { useAuth } from '@/lib/actions/state'
import { Group, Title, Text, Card, Divider, NavLink } from '@mantine/core'
import { CircleUserRound, House, MessageCircle, UserRound, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LumineAvatar from './LumineAvatar'
import { IBMPlexMono } from '@/fonts/fonts'

const SideNav = () => {
	const {
		user: {
			user: { userAvatar, surname, name, username },
		},
	} = useAuth()
	const pathname = usePathname().substring(1)
	const [index, setIndex] = useState<string>('feed')
	useEffect(() => {
		setIndex(pathname)
	}, [pathname])

	return (
		<nav className='flex flex-col w-[270px] fixed'>
			<Group className='mx-auto flex flex-col'>
				<LumineAvatar
					className='rounded-full'
					src={userAvatar}
					size='xl'
					hasStories={true}
					shouldRedirect={false}
					username={username}
					url={userAvatar}
				/>
				<div className='text-center'>
					<Title className={`${IBMPlexMono.className}`}>
						{name} {surname}
					</Title>
					<Text c={'dimmed'} className='font-mono'>
						@{username}
					</Text>
				</div>
			</Group>
			<Card className='px-2 py-3 mt-4 bg-[#1f2124] helvetica-bold' radius='md'>
				<Group className='gap-y-1 inter-500'>
					<NavLink
						className='rounded-lg transition-all'
						label='Profile'
						component={Link}
						href={`/profile/${username}`}
						active={index === `profile/${username}`}
						onClick={() => setIndex(`profile/${username}`)}
						color='#ffd37d'
						leftSection={
							<CircleUserRound size={'18 '} stroke={index === `profile/${username}` ? '#050514' : '#d1d3d6'} />
						}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === `profile/${username}` ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						label='Feed'
						component={Link}
						href={'/feed'}
						active={index === 'feed'}
						onClick={() => setIndex('feed')}
						color='#ffd37d'
						leftSection={<House size={'18 '} stroke={index === 'feed' ? '#050514' : '#d1d3d6'} />}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 'feed' ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						component={Link}
						label='Messages'
						href={'/messages'}
						// disabled={index === 'messages'}
						active={index === 'messages'}
						onClick={() => {
							setIndex('messages')
						}}
						color='#ffd37d'
						leftSection={
							<MessageCircle size={'18 '} stroke={index === 'messages' ? '#050514' : '#d1d3d6'} />
						}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 'messages' ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						component={Link}
						label='Friends'
						href={'/friends'}
						// disabled={index === 'friends'}
						active={index === 'friends'}
						onClick={() => setIndex('friends')}
						color='#ffd37d'
						leftSection={
							<UserRound size={'18'} stroke={index === 'friends' ? '#050514' : '#d1d3d6'} />
						}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								color: index === 'friends' ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className={`rounded-lg transition-all transition-duration-300 $`}
						component={Link}
						label='Groups'
						href={'/groups'}
						// disabled={index === 'groups'}
						active={index === 'groups'}
						onClick={() => setIndex('groups')}
						color='#ffd37d'
						variant='filled'
						leftSection={
							<UsersRound size={'18 '} stroke={index === 'groups' ? '#050514' : '#d1d3d6'} />
						}
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 'groups' ? '#050514' : '#d1d3d6',
							},
						}}
					/>
				</Group>
				<Divider />
				<Group></Group>
			</Card>
		</nav>
	)
}

export default SideNav
