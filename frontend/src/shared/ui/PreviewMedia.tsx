import { Modal, Image } from '@mantine/core'
import { FC } from 'react'

interface props {
	src: string
	type: 'image' | 'video'
	isOpened: boolean
	setIsOpened: (val: boolean) => void
}

export const PreviewMedia: FC<props> = ({ src, type, isOpened, setIsOpened }) => {

	const baseProps = {
		src: src,
		alt: 'media',
		objectFit: 'contain',
		className: '!relative rounded-lg w-full h-full',
	}

	return (
		<>
			<Modal
				styles={{
					content: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
				withCloseButton={false}
				centered
				className='h-full'
				size='auto'
				opened={isOpened}
				onClose={() => setIsOpened(false)}
			>
				{type === 'image' ? (
					<Image {...baseProps} alt='media'/>
				) : (
					<video {...baseProps} />
				)}
			</Modal>
		</>
	)
}
