import { Button, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Camera, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { ImageEditor } from './image-editor'

export const ProfileBackground = ({ imageUrl }: { imageUrl: string }) => {
	const [isBackgroundHovered, setIsBackgroundHovered] = useState(false)
	const [
		isBackgroundModalOpened,
		{ open: openBackgroundModal, close: closeBackgroundModal },
	] = useDisclosure(false)

	const [file, setFile] = useState<FileWithPath | null>(null);


	console.log(file, 'ACCEPTED FILED')
	return (
		<>
			<div
				className='w-full h-[200px] overflow-hidden relative group'
				onMouseEnter={() => setIsBackgroundHovered(true)}
				onMouseLeave={() => setIsBackgroundHovered(false)}
			>
				<Image
					src={imageUrl}
					alt='profile background'
					className='w-full h-full object-cover object-center transition-opacity duration-200'
					width={1920}
					height={1080}
					quality={100}
				/>
				<div
					className={`absolute top-4 right-4 transition-opacity duration-200 ${
						isBackgroundHovered ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<Button
						leftSection={<Camera size={16} />}
						className='bg-black/50 hover:bg-black/70 text-white rounded-lg'
						onClick={() => {
							openBackgroundModal()
						}}
					>
						Change Cover
					</Button>
				</div>
			</div>

			{/* =================MODAL================= */}
			<Modal
				opened={isBackgroundModalOpened}
				onClose={closeBackgroundModal}
				title='Change Cover'
				centered
				radius={'lg'}
				transitionProps={{ transition: 'rotate-left' }}
			>
				<Dropzone
					onDrop={files => {
						setFile(files[0])
					}}
					onReject={files => console.log('rejected files', files)}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					className='p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-300 group cursor-pointer'
				>
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<Upload
							size={48}
							className='text-gray-400 group-hover:text-blue-500 transition-colors duration-300'
						/>
						<div>
							<Text size='lg' inline>
								Drag image here or click to select
							</Text>
							<Text size='sm' c='dimmed' inline mt={7}>
								File should not exceed 5MB
							</Text>
						</div>
					</div>
				
				</Dropzone>
				{file && <img src={URL.createObjectURL(file)} />}
			</Modal>
		</>
	)
}
