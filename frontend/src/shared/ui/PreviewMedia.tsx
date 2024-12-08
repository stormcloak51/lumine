import { Modal } from '@mantine/core'
import Image from 'next/image'
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
		objectFit: 'cover',
		className: '!relative rounded-md',
		fill: true,
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
				variant=''
				opened={isOpened}
				onClose={() => setIsOpened(false)}
			>
				{type === 'image' ? (
					<Image {...baseProps} alt='media' />
				) : (
					<video {...baseProps} />
				)}
			</Modal>
		</>
	)
}
