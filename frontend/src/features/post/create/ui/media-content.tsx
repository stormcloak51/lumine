'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Image, Indicator, Loader } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'
import { usePreviewMutation } from '../model/usePreviewMutation'

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
					className={`overflow-x-auto scrollbar max-w-[100px] flex-nowrap transition-all ${isFocused ? 'opacity-1 flex' : 'opacity-0'}`}
				>
					{previews.map((item, index) => {
						if (!item) return null
						return (
							<div key={index} style={{ minWidth: '50px', maxWidth: '75px' }}>
								<div className='w-full h-full border border-white rounded-md'>
									<Image
										width='100%'
										height='auto'
										src={item}
										alt='media'
										radius={'md'}
										style={{ maxHeight: '50px', objectFit: 'contain' }}
									/>
								</div>
								<PreviewMedia key={index} src={item} type='image' />
							</div>
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
					<Indicator size={16} label={isLoading ? <Loader size={14} /> : content?.length}>
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
