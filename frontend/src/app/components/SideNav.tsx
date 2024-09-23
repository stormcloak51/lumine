'use client';
import { Avatar, Flex, Group, Title, Text, Card, Divider, NavLink } from '@mantine/core'
import { CircleUserRound, House, MessageCircle, UserRound, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const SideNav = () => {
	const [index, setIndex] = useState<number>(1)
	return (
		<nav className='flex flex-col w-[270px] fixed'>
			<Group className='mx-auto flex flex-col'>
				<Avatar color='blue' size='xl' className='rounded-full' src='https://i.pravatar.cc/300' />
				<Title className='inter-500'>Alex White</Title>
				<Card
					shadow='sm'
					padding='md'
					radius='md'
					className='flex flex-row justify-between gap-x-4 !bg-[#1f2124]'>
					<Group gap={'2px'}>
						<Text className='text-center mx-auto'>4.6k</Text>
						<Text c='dimmed' className='text-center mx-auto'>
							Following
						</Text>
					</Group>
					<Group gap={'2px'}>
						<Text className='text-center mx-auto'>1.2k</Text>
						<Text c='dimmed' className='text-center mx-auto'>
							Followers
						</Text>
					</Group>
					<Group gap={'2px'}>
						<Text className='text-center mx-auto'>814</Text>
						<Text c='dimmed' className='text-center mx-auto'>
							Posts
						</Text>
					</Group>
				</Card>
			</Group>
			<Card className='px-2 py-3 mt-4 bg-[#1f2124] helvetica-bold' radius='md'>
				<Group className='gap-y-1 inter-500'>
				<NavLink
						className='rounded-lg transition-all'
						label='Profile'
						component={Link}
						href={'/profile'}
						active={index === 0}
						onClick={() => setIndex(0)}
						color='#ffd37d'
						leftSection={<CircleUserRound size={'18 '} stroke={index === 0 ? '#050514' : '#d1d3d6'} />}
						variant='filled'

						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 0 ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						label='Feed'
						component={Link}
						href={'/feed'}
						active={index === 1}
						onClick={() => setIndex(1)}
						color='#ffd37d'
						leftSection={<House size={'18 '} stroke={index === 1 ? '#050514' : '#d1d3d6'} />}
						variant='filled'

						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 1 ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						component={Link}
						label='Messages'
						href={'/messages'}
						active={index === 2}
						onClick={() => setIndex(2)}
						color='#ffd37d'
						leftSection={<MessageCircle size={'18 '} stroke={index === 2 ? '#050514' : '#d1d3d6'} />}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 2 ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all'
						component={Link}
						label='Friends'
						href={'/friends'}
						active={index === 3}
						onClick={() => setIndex(3)}
						color='#ffd37d'
						leftSection={<UserRound size={'18'} stroke={index === 3 ? '#050514' : '#d1d3d6'} />}
						variant='filled'
						styles={{
							label: {
								fontSize: '16px',
								color: index === 3 ? '#050514' : '#d1d3d6',
							},
						}}
					/>
					<NavLink
						className='rounded-lg transition-all transition-duration-300'
						component={Link}
						label='Groups'
						href={'/groups'}
						active={index === 4}
						onClick={() => setIndex(4)}
						color='#ffd37d'
						variant='filled'
						leftSection={<UsersRound size={'18 '} stroke={index === 4 ? '#050514' : '#d1d3d6'} />}
						styles={{
							label: {
								fontSize: '16px',
								fontWeight: '500',
								color: index === 4 ? '#050514' : '#d1d3d6',
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
