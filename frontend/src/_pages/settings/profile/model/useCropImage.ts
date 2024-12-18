import { userApi } from '@/shared/api/userApi'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { uploadContent } from '@/shared/api/upload-content'
import { getCroppedImg } from '@/shared/lib/getCroppedImg'
import { Area } from 'react-easy-crop'
import { Dispatch, SetStateAction } from 'react'
import { useUser } from '@/shared/stores/user.store'
import { capitalize } from '@/shared/lib/capitalize'

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
	type
}: props) => {
	const { setUser, user } = useUser()
	if (!user?.user) {
		throw new Error('User ID is required')
	}
	const mutation = useMutation({
		mutationFn: async (data: { dto: Partial<IUserCredentials> }) => {
			return await userApi.update({ id: user?.user.id, dto: data.dto })
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
						user?.user.username +
						'/' +
						type +
						croppedImage.type.split('/')[1],
					user?.user.username
				)

				if (type === 'avatar') {
					mutation.mutate({
						dto: {
							userAvatar: url,
						},
					})
					setUser({ ...user, user: { ...user.user, userAvatar: url } })
				} else {
					mutation.mutate({
						dto: {
							userCover: url,
						},
					})
					setUser({ ...user, user: { ...user.user, userCover: url } })
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
