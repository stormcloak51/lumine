'use client'
import { useState } from 'react'
import { CloseButton, Image } from '@mantine/core'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'
import { X } from 'lucide-react'

interface props {
	src: string
	onDelete: (file: string) => void
}

export const MediaContentItem = ({ src, onDelete }: props) => {

	const [isOpenedModal, setOpenedModal] = useState(false)
	return (
		<div style={{ minWidth: '75px', maxWidth: '100' }}>
			<div
				className='w-full h-full border border-white rounded-md cursor-pointer relative mt-3'
			>
				<Image
					width='100%'
					height='auto'
					src={src}
					alt='media'
					radius={'md'}
					onClick={() => setOpenedModal(true)}
					style={{ maxHeight: '50px', objectFit: 'contain' }}
				/>
				<span onClick={() => onDelete(src)} className='absolute top-0 right-0 transform -translate-y-2/4 translate-x-2/4 cursor-pointer z-10'><CloseButton icon={<X size={20} color='#ff4e4e' />} size={22} radius={'xl'} className='bg-[#2b2d31] transition-all hover:bg-[#35373c]' /></span>
			</div>
			<PreviewMedia
				isOpened={isOpenedModal}
				setIsOpened={setOpenedModal}
				src={src}
				type='image'
			/>
		</div>
	)
}
