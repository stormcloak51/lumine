import { setCanvasPreview } from '@/shared/helpers/setCanvasPreview'
import { Button, FileInput, Image as MantineImage, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Paperclip } from 'lucide-react'
import { useRef, useState } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'

interface UploadImageProps {
	onChange: (file: File | null) => void
}

export const UploadImage = ({ onChange }: UploadImageProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [crop, setCrop] = useState<Crop>()
	const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)
	const [inputFile, setInputFile] = useState<File | null>(null)
	const imgRef = useRef<HTMLImageElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const handleAvatarChange = (file: File | null) => {
		if (!file) return setInputFile(null), onChange(null)
		const reader = new FileReader()
		reader.onload = () => {
			setImgSrc(reader.result as string)
			setInputFile(file)
			open()
		}
		reader.readAsDataURL(file)
	}

	const handleCrop = async () => {
		if (!canvasRef.current || !imgRef.current || !crop) return
		await setCanvasPreview(canvasRef.current, imgRef.current, crop)
		canvasRef.current.toBlob(blob => {
			if (blob) {
				const croppedFile = new File([blob], 'avatar.png', {
					type: 'image/png',
				})
				onChange(croppedFile)
				close()
			}
		}, 'image/png')
	}

	const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const { width, height } = event.currentTarget
		setCrop(
			centerCrop(
				makeAspectCrop({ unit: '%', width: 40 }, 1, width, height),
				width,
				height
			)
		)
	}

	return (
		<>
			<FileInput
				leftSection={<Paperclip size={16} />}
				placeholder='Attach your avatar'
				className='h-[82px] mt-5'
				value={inputFile}
				onChange={handleAvatarChange}
			/>
			{imgSrc && (
				<Modal opened={opened} onClose={close} title='Upload Image' centered>
					<ReactCrop crop={crop} onChange={setCrop} aspect={1}>
						<MantineImage
							ref={imgRef}
							src={imgSrc}
							alt='avatar'
							onLoad={onImageLoad}
						/>
					</ReactCrop>
					<Button onClick={handleCrop}>Confirm Crop</Button>
					<canvas
						ref={canvasRef}
						style={{ display: 'none', width: 75, height: 75 }}
					/>
				</Modal>
			)}
		</>
	)
}
