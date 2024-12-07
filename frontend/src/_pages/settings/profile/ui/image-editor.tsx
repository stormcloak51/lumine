import { FC, useCallback, useEffect, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { Button, useMantineTheme } from '@mantine/core'
import { useCropImage } from '../model/useCropImage'

interface props {
	isOpen: boolean
	img: string
	close: () => void
	handleCancel: () => void
	type: 'avatar' | 'background'
}

export const ImageEditor: FC<props> = ({ isOpen, img, close, handleCancel, type }) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState<number>(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [isCropping, setIsCropping] = useState(false)

	const { handleCropImage } = useCropImage({
		img,
		croppedAreaPixels,
		close,
		setIsCropping,
		type,
	})
	const theme = useMantineTheme()

	const onCropChange = (crop: { x: number; y: number }) => setCrop(crop)
	const onZoomChange = (zoom: number) => setZoom(zoom)

	const onCropCompleteHandler = useCallback(
		(_: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels)
		},
		[]
	)

	useEffect(() => {
		if (!isOpen) {
			setCrop({ x: 0, y: 0 })
			setZoom(1)
		}
	}, [isOpen])

	return (
		<div className='w-full h-[400px]'>
			<Cropper
				image={img}
				crop={crop}
				zoom={zoom}
				aspect={type === 'avatar' ? 1 : 3 / 1}
				onCropChange={onCropChange}
				onZoomChange={onZoomChange}
				onCropComplete={onCropCompleteHandler}
			/>
			<div className='flex justify-end gap-4 mt-4'>
				<Button
					radius={'lg'}
					autoContrast
					color={theme.colors.myColor[4]}
					loading={isCropping}
					onClick={handleCropImage}
				>
					Save
				</Button>
				<Button
					onClick={handleCancel}
					radius={'lg'}
					color={theme.colors.myColor[4]}
					variant='outline'
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}
