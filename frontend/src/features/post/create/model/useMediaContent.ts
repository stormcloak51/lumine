import { IAsset } from '@/shared/config/types/general.types'
import { useUrls } from '@/shared/hooks/useUrls'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { usePreviewMutation } from './usePreviewMutation'


export const useMediaContent = () => {
	const { media, setMedia } = useMediaContentStore()
	const [previews, setPreviews] = useState<IAsset[]>([])
	const { createMutation, deleteMutation } = usePreviewMutation()
	const { createUrls, revokeUrls } = useUrls()

	const handleFileChange = async (files: File[]) => {
		if (media && media.length + files.length > 7) {
			notifications.show({
				color: 'red',
				title: 'Oops!',
				message: 'You cannot upload more than 7 media files',
			})
			return
		}
		const urlFiles = createUrls(files)
		setPreviews(prev => [
			...prev,
			...urlFiles.map(item => ({ url: item, key: null })),
		])
		const result = await createMutation.mutateAsync(files)
		setMedia([...(media ?? []), ...result])
		setPreviews([...(media ?? []), ...result])
		revokeUrls(urlFiles)
	}

	const handleFileDelete = async (file: IAsset) => {
		try {
			setPreviews(prev => prev?.filter(item => item.url != file.url))
			setMedia(media?.filter(item => item.url != file.url))
			await deleteMutation.mutateAsync(file)
		} catch (err) {
			console.log(err)
			notifications.show({
				color: 'red',
				title: 'Oops!',
				message: 'Something went wrong',
			})
		}
	}

	return {
		handleChange: handleFileChange,
		handleDelete: handleFileDelete,
		media,
		previews,
		setPreviews,
		isLoading: createMutation.isPending
	}
}
