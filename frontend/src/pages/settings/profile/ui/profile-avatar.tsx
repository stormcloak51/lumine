import { useAuth } from '@/shared/lib/useAuth'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { Button } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useState } from 'react'

export const ProfileAvatar = () => {
	const [isAvatarHovered, setIsAvatarHovered] = useState
	(false)
	const { user } = useAuth()

	return (
		<div
			className='absolute top-[130px] left-[10%] transform -translate-x-1/2'
			onMouseEnter={() => setIsAvatarHovered(true)}
			onMouseLeave={() => setIsAvatarHovered(false)}
		>
			<div className='relative'>
				<LumineAvatar
					hasStories={false}
					size={130}
					url={user?.userAvatar}
					username={user?.username}
					shouldRedirect={false}
				/>
				<div
					className={`absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200 ${
						isAvatarHovered ? 'opacity-100' : 'opacity-0'
					}`}
					style={{ background: 'rgba(0, 0, 0, 0.5)' }}
				>
					<Button
						className='bg-transparent hover:bg-black/70 text-white rounded-full p-2'
						onClick={() => {
							
						}}
					>
						<Camera size={24} />
					</Button>
				</div>
			</div>
		</div>
	)
}
