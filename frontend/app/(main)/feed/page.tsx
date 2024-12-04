'use client'
import { Feed } from '@/pages/feed'
import { UploadButton } from '../../api/uploadthing/components'

// export { metadata }

export default function RootFeed() {
	return (
		<>
			<UploadButton endpoint={'mediaPost'} onClientUploadComplete={file => console.log(file, 'RESULT')} />
			<Feed />
		</>
	)
}
