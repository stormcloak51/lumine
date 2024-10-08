'use client'
import LumineAvatar from '@/app/components/LumineAvatar'
import { useAuth } from '@/lib/actions/state'
import { ActionIcon, Card, Flex, Title } from '@mantine/core'
import { Image } from '@mantine/core'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Profile = () => {
	const {
		user: { user },
	} = useAuth()
	return (
		<div className='w-full'>
			<Flex className='w-full relative' direction={'column'}>
				<div className='w-full h-[200px] overflow-hidden'>
					<Image
						src='https://cdn.dribbble.com/users/1821976/screenshots/14547103/media/4373ea85392e1b87d1bae60e9a125b31.jpg'
						alt='profile background'
						className='w-full h-full object-cover object-center rounded-t-lg'
					/>
				</div>
				<Card className='!bg-[#1f2124] rounded-b-lg border-b border-r border-l border-[rgb(66,66,66)] relative pl-[180px]'>
					<div className='flex gap-x-2 items-center'>
						<Title className='inter-700 tracking-wide'>
							{user.name} {user.surname}
						</Title>
						<DotLottieReact
							src='https://fonts.gstatic.com/s/e/notoemoji/latest/1f940/lottie.json'
							autoplay
							className=''
							playOnHover
							style={{
								width: '28px',
								height: '28px',
							}}
						/>
					</div>
				</Card>
				<LumineAvatar
					position='absolute'
					className='top-[130px] transform -translate-x-1/2 left-[10%]'
					hasStories={true}
					size={130}
				/>
			</Flex>
		</div>
	)
}

export default Profile
