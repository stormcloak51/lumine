import { uploadContent } from '@/shared/api/upload-content'
import { userService } from '@/shared/api/user.service'
import { IUser } from '@/shared/config/types/user.types'
import { getCroppedImg } from '@/shared/helpers/getCroppedImg'
import { capitalize } from '@/shared/helpers/capitalize'
import { useUser } from '@/shared/stores/user/user.store'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Area } from 'react-easy-crop'

interface props {
	img: string
	croppedAreaPixels: Area | null
	close: () => void
	setIsCropping: Dispatch<SetStateAction<boolean>>
	type: 'avatar' | 'background'
}

export const useCropImage = ({
	img,
	croppedAreaPixels,
	close,
	setIsCropping,
	type,
}: props) => {
	const { setUser, user } = useUser()
	if (!user) {
		throw new Error('User ID is required')
	}
	const mutation = useMutation({
		mutationFn: async (data: { dto: Partial<IUser> }) => {
			return await userService.update(data.dto)
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
						user.username +
						'/' +
						type +
						croppedImage.type.split('/')[1],
					user.username
				)

				if (type === 'avatar') {
					mutation.mutate({
						dto: {
							userAvatar: url,
						},
					})
					setUser({ ...user, userAvatar: url  })
				} else {
					mutation.mutate({
						dto: {
							userCover: url,
						},
					})
					setUser({ ...user, userCover: url })
				}

				notifications.show({
					title: 'Success',
					message: `${capitalize(type)} saved successfully`,
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
