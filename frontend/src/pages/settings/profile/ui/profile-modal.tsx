// MODAL FOR CHANGING PROFILE/BACKGROUND IMAGES

import { Modal, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { Upload } from 'lucide-react'
import { ImageEditor } from './image-editor'
import { Dispatch, SetStateAction } from 'react'

interface props {
	type: 'profile' | 'background'
	isOpened: boolean
	close: () => void
	file: File | null
	setFile: Dispatch<SetStateAction<File | null>>
}


export const ProfileModal = ({ type, isOpened, close, file, setFile }: props) => {
	const handleCancel = () => {
		close()
		setTimeout(() => {
			setFile(null)
		}, 200);
	}
	
	return (
		<Modal
			opened={isOpened}
			onClose={close}
			title='Change Cover'
			centered
			radius={'lg'}
			size={'50%'}
			transitionProps={{ transition: 'rotate-left' }}>
			{!file ? (
				<Dropzone
					onDrop={files => setFile(files[0])}
					onReject={files =>
						notifications.show({
							title: 'File Rejected',
							message: files[0].errors[0].message,
							color: 'red',
						})
					}
					maxSize={25 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					className='p-6 border-2 border-dashed border-gray-300 hover:border-[#ffd37d] transition-colors duration-300 group cursor-pointer'>
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<Upload
							size={48}
							className='text-gray-400 group-hover:text-[#ffd37d] transition-colors duration-300'
						/>
						<div>
							<Text size='lg' inline>
								Drag image here or click to select
							</Text>
							<Text size='sm' c='dimmed' inline mt={7}>
								{type === 'profile' ? 'File should be less than 5MB' : 'File should be less than 25MB'}
							</Text>
						</div>
					</div>
				</Dropzone>
			) : (
				<ImageEditor
					isOpen={isOpened}
					img={URL.createObjectURL(file)}
					close={close}
					handleCancel={handleCancel}
				/>
			)}
		</Modal>
	)
}
