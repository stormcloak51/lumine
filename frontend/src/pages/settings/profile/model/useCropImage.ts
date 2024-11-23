import { userApi } from '@/shared/api/userApi'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { uploadContent } from '@/shared/api/upload-content'
import { getCroppedImg } from '@/shared/lib/getCroppedImg'
import { Area } from 'react-easy-crop'
import { Dispatch, SetStateAction } from 'react'
import { useAuth } from '@/shared/lib/useAuth'

interface props {
	img: string
	croppedAreaPixels: Area | null
	close: () => void
	setIsCropping: Dispatch<SetStateAction<boolean>>
}

export const useCropImage = ({img, croppedAreaPixels, close, setIsCropping}: props) => {
	const {user: {username, id}} = useAuth()
	const mutation = useMutation({
		mutationFn: async (data: { dto: Partial<IUserCredentials> }) => {
			return await userApi.update({ id, dto: data.dto })
		},
	})

	const handleCropImage = async () => {
		setIsCropping(true)
		try {
			if (croppedAreaPixels) {
				const croppedImage = await getCroppedImg(img, croppedAreaPixels)
				const url = await uploadContent(
					croppedImage,
					'accounts/' +
						username +
						'/' +
						'background.' +
						croppedImage.type.split('/')[1],
					username
				)
				await mutation.mutateAsync({dto: { userCover: url } })

				notifications.show({
					title: 'Success',
					message: 'Background saved successfully',
				})
				close()
			}
		} catch (e) {
			notifications.show({
				title: 'Error',
				message: 'Something went wrong, check console for details',
			})
			console.error(e)
		} finally {
			setIsCropping(false)
		}
	}

	return {
		handleCropImage,
	}
}
