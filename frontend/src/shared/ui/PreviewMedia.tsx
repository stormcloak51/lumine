import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { FC } from 'react'

interface props {
	src: string
	type: 'image' | 'video'
}

export const PreviewMedia: FC<props> = ({ src, type }) => {
	const [isOpenedPreview, { open: openPreview, close: closePreview }] =
		useDisclosure(false)

	const handlePreview = () => {
		openPreview()
	}

	const baseProps = {
		src: src,
		alt: 'media',
		objectFit: 'cover',
		onClick: handlePreview,
		className: '!relative rounded-md',
	}

	return (
		<>
			{Media({
				width: 60,
				height: 50,
				className: 'rounded-md border border-slate-300 cursor-pointer',
			})}
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
				opened={isOpenedPreview}
				onClose={closePreview}
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
