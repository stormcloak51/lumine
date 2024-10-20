'use client'

import { useDisclosure } from '@mantine/hooks'
import {
	Modal,
	Image as MantineImage,
	FileInput,
	__InputStylesNames,
	FileInputProps,
	MantineTheme,
	StylesRecord,
} from '@mantine/core'
import ReactCrop, { Crop, makeAspectCrop, centerCrop } from 'react-image-crop'
import { Key, SyntheticEvent, useState } from 'react'
import 'react-image-crop/src/ReactCrop.scss'
import { Paperclip } from 'lucide-react'

interface UploadImageProps {
	classNames?:
		| Partial<Record<__InputStylesNames, string>>
		| ((
				theme: MantineTheme,
				props: FileInputProps<false>,
				ctx: unknown
		  ) => StylesRecord<__InputStylesNames, string>)
		| undefined
	key: Key | null | undefined
	onChange: (file: File | null) => void;
}

export const UploadImage = ({
	classNames,
	onChange,
	key,
}: UploadImageProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [crop, setCrop] = useState<Crop>()
	const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)
	const [errorDimensions, setErrorDimensions] = useState('')

	const handleAvatarChange = (file: File | null) => {
		if (file) {
			const reader = new FileReader()
			reader.addEventListener('load', () => {
				const imageUrl = reader.result as string

				const imageElement = new Image()
				imageElement.src = imageUrl

				imageElement.addEventListener('load', (e: Event) => {
					const img = e.currentTarget as HTMLImageElement
					const { naturalHeight, naturalWidth } = img
					if (naturalHeight < 75 || naturalWidth < 75) {
						setErrorDimensions('Image must be at least 75x75 pixels')
						onChange(null)
						return setImgSrc(undefined)
					}
				})

				setImgSrc(imageUrl)
				onChange(file)
			})
			reader.readAsDataURL(file)
			open()
		} else {
			setImgSrc(undefined)
			onChange(null)
		}
	}

	const onImageLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		const { width, height } = event.currentTarget
		const crop = makeAspectCrop(
			{
				unit: '%',
				width: 40,
			},
			1,
			width,
			height
		)
		const centeredCrop = centerCrop(crop, width, height)
		setCrop(centeredCrop)
	}

	return (
		<>
			<FileInput
				key={key}
				leftSection={<Paperclip size={16} />}
				label='Attach your avatar'
				accept='image/png,image/jpeg,image/jpg'
				placeholder='Your avatar'
				leftSectionPointerEvents='none'
				classNames={classNames}
				className='h-[82px] mt-5'
				onChange={file => {
					if (!file) return
					handleAvatarChange(file)
				}}
				error={errorDimensions}
			/>
			{imgSrc && (
				<Modal
					radius={'lg'}
					opened={opened}
					onClose={close}
					title='Upload Image'
					centered
					className='w-auto h-auto'
				>
					<ReactCrop
						onChange={percentCrop => {
							setCrop(percentCrop)
						}}
						minWidth={75}
						// maxWidth={75}
						crop={crop}
						circularCrop
						keepSelection
						aspect={1}
					>
						<MantineImage
							src={imgSrc}
							alt='avatar'
							style={
								{
									// width: '100%',
									// maxWidth: '70vw',
									// height: '100%',
									// minHeight: '50vh',
									// maxHeight: '70vh',
								}
							}
							onLoad={onImageLoad}
						/>
					</ReactCrop>
				</Modal>
			)}
		</>
	)
}
