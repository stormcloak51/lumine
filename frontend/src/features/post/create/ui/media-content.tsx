'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Indicator } from '@mantine/core'
import { Camera, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePreviewMutation } from '../model/usePreviewMutation'
import { MediaContentItem } from './media-content-item'
import { useUrls } from '@/shared/hooks/useUrls'

interface props {
	isFocused: boolean
}

export const MediaContent = ({ isFocused }: props) => {
	const { content, setContent } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)
	const { previewMutate, isLoading } = usePreviewMutation()
	const { createUrls, revokeUrls } = useUrls()

	const handleFileChange = async (files: File[]) => {
		const urlFiles = files.map(item => URL.createObjectURL(item))
		setPreviews(prev => ([...(prev ?? []), ...urlFiles]))
		const result = await previewMutate(files)
		setContent([...(content ?? []), ...result])
	}


	useEffect(() => {
		if (content) {
			setPreviews(content.map(file => file))
		}
	}, [])

	return (
		<>
			{previews && (
				<Flex
					align={'center'}
					gap={10}
					className={`cursor-default overflow-x-auto scrollbar max-w-[150px] flex-nowrap ${isFocused ? 'flex' : 'hidden'}`}
				> 
					{previews.map((item, index) => {
						if (!item) return null
						return (
							<MediaContentItem src={item} key={index} />
						)
					})}
				</Flex>
			)}
			<FileButton
				accept='image/* video/*'
				onChange={handleFileChange}
				multiple
				disabled={isLoading}
			>
				{props => (
					<Indicator color='#ffbb38' size={16} label={isLoading ? <LoaderCircle size={12} className='animate-spin'/> : content?.length}>
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
