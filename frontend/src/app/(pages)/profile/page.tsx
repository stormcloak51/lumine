'use client'
import LumineAvatar from '@/app/components/LumineAvatar'
import { useAuth } from '@/lib/actions/state'
import {
	Avatar,
	Card,
	Flex,
	Title,
	Text,
	Button,
	HoverCard,
	Transition,
	Grid,
} from '@mantine/core'
import { Image } from '@mantine/core'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useClipboard } from '@mantine/hooks'
import { useState } from 'react'
import { Pen } from 'lucide-react'
import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'

const Profile = () => {
	const clipboard = useClipboard({ timeout: 1000 })
	const {
		user: { user },
	} = useAuth()

	const [mounted, setMounted] = useState<boolean>(false)

	return (
		<Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
			<Flex className='w-full relative' direction={'column'}>
				<div className='w-full h-[200px] overflow-hidden'>
					<Image
						src='https://cdn.dribbble.com/users/1821976/screenshots/14547103/media/4373ea85392e1b87d1bae60e9a125b31.jpg'
						alt='profile background'
						className='w-full h-full object-cover object-center rounded-t-lg'
					/>
				</div>
				<Card className='!bg-[#1f2124] rounded-b-lg border-b border-r border-l border-[rgb(66,66,66)] relative pl-[180px]'>
					<div className='flex items-center justify-between'>
						<div>
							<div className='flex gap-x-2 items-center'>
								<Title className='inter-700 tracking-wide'>
									{user.name} {user.surname}
								</Title>
								<DotLottieReact
									src='https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/lottie.json'
									autoplay
									className=''
									playOnHover
									style={{
										width: '28px',
										height: '28px',
									}}
								/>
							</div>
							<div className='flex gap-x-2'>
								<HoverCard width={280} shadow='md' openDelay={400}>
									<HoverCard.Target>
										<Text
											onClick={(e: React.MouseEvent<HTMLElement>) => {
												clipboard.copy(user.username)
												setMounted(true)
												setTimeout(() => setMounted(false), 500)
											}}
											c={'dimmed'}
											className='w-min cursor-pointer font-sans'>
											@{user.username}
										</Text>
									</HoverCard.Target>
									<HoverCard.Dropdown className='!bg-[#1f2124] rounded-xl'>
										<Transition
											mounted={true}
											transition='fade-up'
											duration={400}
											timingFunction='ease'>
											{styles => (
												<Text style={styles}>{user.bio !== '' ? user.bio : 'No bio yet'}</Text>
											)}
										</Transition>
									</HoverCard.Dropdown>
								</HoverCard>

								<Transition
									mounted={mounted}
									transition='fade-left'
									duration={500}
									timingFunction='ease'>
									{styles => (
										<Text c={'green'} style={styles} className='w-min cursor-pointer font-sans'>
											{clipboard.copied ? 'Copied!' : ''}
										</Text>
									)}
								</Transition>
							</div>
						</div>
						<Button
							className='text-[16px] font-sans'
							leftSection={<Pen size={20} />}
							color={'#ffd37d'}
							variant={'light'}>
							Change
						</Button>
					</div>
				</Card>
				<LumineAvatar
					position='absolute'
					className='top-[130px] transform -translate-x-1/2 left-[10%]'
					hasStories={true}
					size={130}
				/>
			</Flex>
			<Grid.Col span={7.5} className='px-0 pt-4'>
				<PostCreate />
			</Grid.Col>
			<Grid.Col className='px-0 pt-4' span={4} offset={0.5}>
				<Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'>
					<Title order={3}>Followers</Title>
					<Avatar.Group spacing={'sm'}>
						<Avatar size={46} src={user.userAvatar} />
						<Avatar size={46} src={user.userAvatar} />
						<Avatar size={46} src={user.userAvatar} />
						<Avatar size={46}>+5</Avatar>
					</Avatar.Group>
				</Card>
			</Grid.Col>
			<Grid.Col span={7.5} className='px-0'>
				
				<PostList title='Posts' queryKey={user.username}/>
				
			</Grid.Col>
		</Grid>
	)
}

export default Profile
