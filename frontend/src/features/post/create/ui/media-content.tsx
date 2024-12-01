'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton, Flex, Image } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'

export const MediaContent = () => {
	const { content, setContent } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)

	const handleFileChange = (files: File[]) => {
		const urlFiles = files.map(file => URL.createObjectURL(file))
		setContent([...(content ?? []), ...urlFiles])
	}
	useEffect(() => {
		setPreviews(
			content?.map(item => {
				return item
			}),
		)
		return () => {
			setPreviews(null)
		}
	}, [content])

	useEffect(() => {
		setPreviews(
			content?.map(item => {
				 const blobItem = new Blob([item], { type: 'image/png' })
				 return URL.createObjectURL(blobItem)
			}),
		)

	}, [])	
	console.log(previews)
	return (
		<>
			{previews && (
				<Flex align={'center'} gap={10} className='overflow-x-auto scrollbar max-w-[100px] flex-nowrap'>
					{previews.map((item, index) => {
						if (!item) return null
						return (
							
							<div key={index} style={{ minWidth: '50px', maxWidth: '75px'}}>
								<Image
									width="100%"
									height="auto"
									src={item}
									alt='media'
									style={{ maxHeight: '50px', objectFit: 'contain' }}
								/>
								<PreviewMedia key={index} src={item} type='image' />
							</div>
						)
					})}
				</Flex>
			)}
			<FileButton accept='image/* video/*' onChange={handleFileChange} multiple>
				{props => <Camera {...props} className={'text-[rgb(66,66,66)] cursor-pointer'} />}
			</FileButton>
		</>
	)
}
