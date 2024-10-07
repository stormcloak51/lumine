import LumineAvatar from '@/app/components/LumineAvatar'
import { Card, Flex } from '@mantine/core'
import { Image } from '@mantine/core'

const Profile = () => {
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
				<Card className='!bg-[#1f2124] rounded-b-lg border-b border-r border-l border-[rgb(66,66,66)] relative'>
				</Card>
				<LumineAvatar position='absolute' className='top-[150px] transform -translate-x-1/2 left-[10%]' hasStories={true} size={100} />
			</Flex>
		</div>
	)
}

export default Profile
