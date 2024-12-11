'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Indicator } from '@mantine/core'
import { Camera, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePreviewMutation } from '../model/usePreviewMutation'
import { MediaContentItem } from './media-content-item'
import { useUrls } from '@/shared/hooks/useUrls'
import { utapiDeleteFiles } from '@/shared/api/uploadthing/actions'
import { notifications } from '@mantine/notifications';

interface props {
	isFocused: boolean
}

export const MediaContent = ({ isFocused }: props) => {
	const { media, setMedia } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)
	const { createPreviewMutate, isLoading } = usePreviewMutation()
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
		const result = await createPreviewMutate(files)
		setMedia([...(media ?? []), ...result])
		setPreviews([...(media?.map(item => item.url) ?? []), ...(result?.map(item => item.url))])
		revokeUrls(urlFiles)
	}

	const handleFileDelete = async (file: string) => {
		const result = await utapiDeleteFiles(file)
		console.log(result, 'RESULT')
	}
	

	useEffect(() => {
		if (media) {
			setPreviews(media.map(file => file.url))
		}
	}, [])

	return (
		<>
			{previews && (
				<Flex
					align={'center'}
					gap={16}
					className={`cursor-default overflow-x-auto scrollbar max-w-[190px] flex-nowrap ${isFocused ? 'flex' : 'hidden'}`}
				> 
					{previews.map((item, index) => {
						if (!item) return null
						return (
							<MediaContentItem onDelete={handleFileDelete} src={item} key={index} />
						)
					})}
				</Flex>
			)}
			<FileButton
				accept='image/* video/*'
				onChange={handleFileChange}
				multiple
				disabled={isLoading || media?.length == 5}
				
			>
				{props => (
					<Indicator color='#ffbb38' size={16} label={isLoading ? <LoaderCircle size={12} className='animate-spin'/> : media?.length}>
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
