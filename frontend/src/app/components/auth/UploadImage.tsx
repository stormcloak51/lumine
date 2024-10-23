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
	Button,
	CloseIcon,
} from '@mantine/core'
import ReactCrop, {
	Crop,
	makeAspectCrop,
	centerCrop,
	convertToPixelCrop,
} from 'react-image-crop'
import { SyntheticEvent, useRef, useState } from 'react'
import 'react-image-crop/src/ReactCrop.scss'
import { Paperclip, Loader } from 'lucide-react'
import { setCanvasPreview } from '@/lib/utils/setCanvasPreview'

interface UploadImageProps {
	classNames?:
		| Partial<Record<__InputStylesNames, string>>
		| ((
				theme: MantineTheme,
				props: FileInputProps<false>,
				ctx: unknown
		  ) => StylesRecord<__InputStylesNames, string>)
		| undefined
	onChange: (file: File | null) => void
}

export const UploadImage = ({ classNames, onChange }: UploadImageProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [crop, setCrop] = useState<Crop>()
	const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)
	const [errorDimensions, setErrorDimensions] = useState('')
	const [inputFile, setInputFile] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const fileInputRef = useRef<HTMLButtonElement>(null)
	const imgRef = useRef<HTMLImageElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const handleAvatarChange = (file: File | null) => {
		if (file) {
			setIsLoading(true)
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
			setIsLoading(false)
		} else {
			setImgSrc(undefined)
			onChange(null)
		}
	}

	const handleCrop = async () => {
		if (!canvasRef.current || !imgRef.current || !crop) return
		try {
			await setCanvasPreview(
				canvasRef.current,
				imgRef.current,
				convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
			)

			return new Promise<void>(resolve => {
				canvasRef.current!.toBlob(blob => {
					if (blob) {
						const file = new File([blob], 'avatar.png', { type: 'image/png' })
						onChange(file)
						close()
					}
					resolve()
				}, 'image/png')
			})
		} catch (error) {
			console.error('Error in handleCrop:', error)
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
				leftSection={<Paperclip size={16} />}
				aria-label='Attach your avatar'
				label='Attach your avatar'
				rightSection={
					inputFile && (
						<CloseIcon
							className='cursor-pointer rounded-[4px] bg-transparent hover:bg-gray-500/20'
							onClick={() => {
								setInputFile(null)
								onChange(null)
							}}
						/>
					)
				}
				ref={fileInputRef}
				accept='image/png,image/jpeg,image/jpg'
				placeholder='Your avatar'
				leftSectionPointerEvents='none'
				classNames={classNames}
				value={inputFile}
				className='h-[82px] mt-5'
				onChange={file => {
					if (!file) return
					setInputFile(file)
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
							ref={imgRef}
							src={imgSrc}
							alt='avatar'
							style={{}}
							onLoad={onImageLoad}
						/>
					</ReactCrop>
					<Button onClick={handleCrop}>Upload</Button>
					<canvas
						ref={canvasRef}
						className='mt-4'
						style={{
							display: 'none',
							border: '1px solid black',
							objectFit: 'contain',
							width: '75px',
							height: '75px',
						}}
					></canvas>
				</Modal>
			)}
		</>
	)
}
