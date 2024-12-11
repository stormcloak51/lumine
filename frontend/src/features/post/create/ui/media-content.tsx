'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Indicator } from '@mantine/core'
import { Camera, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePreviewMutation } from '../model/usePreviewMutation'
import { MediaContentItem } from './media-content-item'
import { useUrls } from '@/shared/hooks/useUrls'
import { notifications } from '@mantine/notifications';
import { IAsset } from '@/shared/config/types/general.types'

interface props {
	isFocused: boolean
}

export const MediaContent = ({ isFocused }: props) => {
	const { media, setMedia } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)
	const { createMutation, deleteMutation } = usePreviewMutation()
	const { createUrls, revokeUrls } = useUrls()

	const handleFileChange = async (files: File[]) => {
		if (media && (media.length + files.length > 7)) {
			notifications.show({
				color: 'red',
				title: 'Oops!',
				message: 'You cannot upload more than 7 media files'
			})
			return
		}
		const urlFiles = createUrls(files)
		setPreviews(prev => ([...(prev ?? []), ...urlFiles]))
		const result = await createMutation.mutateAsync(files)
		setMedia([...(media ?? []), ...result])
		setPreviews([...(media?.map(item => item.url) ?? []), ...(result?.map(item => item.url))])
		revokeUrls(urlFiles)
	}

	const handleFileDelete = async (file: IAsset) => {
		try {
			setPreviews(prev => prev?.filter(item => item != file.url))
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
	

	useEffect(() => {
		if (media) {
			setPreviews(media.map(file => file.url))
		}
	}, [])

	return (
		<>
			{previews && media && (
				<Flex
					align={'center'}
					gap={16}
					className={`cursor-default overflow-x-auto scrollbar max-w-[190px] flex-nowrap ${isFocused ? 'flex' : 'hidden'}`}
				> 
					{media.map((item, index) => {
						if (!item) return null
						return (
							<MediaContentItem onDelete={handleFileDelete} file={item} key={index} />
						)
					})}
				</Flex>
			)}
			<FileButton
				accept='image/* video/*'
				onChange={handleFileChange}
				multiple
				disabled={createMutation.isPending || media?.length == 5}
				
			>
				{props => (
					<Indicator color='#ffbb38' size={16} label={createMutation.isPending ? <LoaderCircle size={12} className='animate-spin'/> : media?.length}>
						<Camera
							{...props}
							className={'text-[rgb(66,66,66)] cursor-pointer'}
						/>
					</Indicator>
				)}
			</FileButton>
		</>
	)
}
