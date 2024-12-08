'use client'
import { useState } from 'react'
import {Image} from '@mantine/core'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'

interface props {
	src: string
}

export const MediaContentItem = ({src}: props) => {

	const [ isOpenedModal, setOpenedModal ] = useState(false)
	return (
		<div style={{ minWidth: '75px', maxWidth: '100' }}>
			<div
				className='w-full h-full border border-white rounded-md cursor-pointer'
				onClick={() => setOpenedModal(true)}>
				<Image
					width='100%'
					height='auto'
					src={src}
					alt='media'
					radius={'md'}
					style={{ maxHeight: '50px', objectFit: 'contain' }}
				/>
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
