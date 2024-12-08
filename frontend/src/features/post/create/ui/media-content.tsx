'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Indicator, Loader } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePreviewMutation } from '../model/usePreviewMutation'
import { MediaContentItem } from './media-content-item'

interface props {
	isFocused: boolean
}

export const MediaContent = ({ isFocused }: props) => {
	const { content, setContent } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)
	const { previewMutate, isLoading } = usePreviewMutation()

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
					<Indicator size={16} label={isLoading ? <Loader size={14} /> : content?.length && content?.length > 0 ? content.length : ''}>
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
