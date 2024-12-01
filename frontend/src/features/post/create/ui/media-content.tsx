'use client'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import { FileButton } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'

interface props {}

export const MediaContent = () => {
	const { content, setContent } = useMediaContentStore()
	const [previews, setPreviews] = useState<string[] | undefined | null>(null)

	const handleFileChange = (files: File[]) => {
		const urlFiles = files.map(file => (
			URL.createObjectURL(file)
		))
		setContent([...(content ?? []), ...urlFiles])
	}
	useEffect(() => {
		setPreviews(
			content?.map(item => {
				return item
			})
		)
		return () => {
			setPreviews(null)
		}
	}, [content])
	console.log(
		localStorage.getItem('media-content-storage')?.length
			? JSON.parse(localStorage.getItem('media-content-storage'))
			: null,
		content,
		'CONTENT'
	)
	useEffect(() => {
		setPreviews(
			content?.map(item => {
				return item
			})
		)
	}, [])
	return (
		<>
			{previews && (
				<div className='flex flex-row gap-x-2'>
					{previews.map((item, index) => {
						if (!item) return null
						return <PreviewMedia key={index} src={item} type='image' />
					})}
				</div>
			)}
			<FileButton accept='image/* video/*' onChange={handleFileChange} multiple>
				{props => (
					<Camera
						{...props}
						className={'text-[rgb(66,66,66)] cursor-pointer'}
					/>
				)}
			</FileButton>
		</>
	)
}
