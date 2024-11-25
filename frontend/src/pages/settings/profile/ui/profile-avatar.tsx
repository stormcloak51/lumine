import { useAuth } from '@/shared/lib/useAuth'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { Button } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { ProfileModal } from './profile-modal'
import { useDisclosure } from '@mantine/hooks'

export const ProfileAvatar = () => {
	const [isAvatarHovered, setIsAvatarHovered] = useState(false)
	const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)
	const { user } = useAuth()

	const [file, setFile] = useState<File | null>(null)
	const [croppedImage, setCroppedImage] = useState<string | null>(null)
	return (
		<>
			<div
				className='absolute top-[130px] left-[10%] transform -translate-x-1/2'
				onMouseEnter={() => setIsAvatarHovered(true)}
				onMouseLeave={() => setIsAvatarHovered(false)}>
				<div className='relative'>
					<LumineAvatar
						hasStories={false}
						size={130}
						url={user?.userAvatar  || croppedImage}
						username={user?.username}
						shouldRedirect={false}
					/>
					<div
						className={`absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200 ${
							isAvatarHovered ? 'opacity-100' : 'opacity-0'
						}`}
						style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
						<Button
							className='bg-transparent hover:bg-black/70 text-white rounded-full p-2'
							onClick={openModal}>
							<Camera size={24} />
						</Button>
					</div>
				</div>
			</div>
			<ProfileModal
				type={'avatar'}
				isOpened={isModalOpened}
				close={closeModal}
				file={file}
				setFile={setFile}
			/>
		</>
	)
}
