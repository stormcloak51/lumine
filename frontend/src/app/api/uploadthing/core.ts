import { createUploadthing, type FileRouter } from 'uploadthing/next'

export const f = createUploadthing()

export const ourFileRouter = {
	mediaPost: f({
		image: { maxFileSize: '8MB', maxFileCount: 5 },
		video: { maxFileSize: '256MB', maxFileCount: 2 },
	}).onUploadComplete(({ file }) => {
		const newUrl = file.url.replace(
			'/f/',
			`/a/${process.env.UPLOADTHING_APP_ID}/`
		)
		return { url: newUrl, key: file.key }
	}),
} satisfies FileRouter
export type OurFileRouter = typeof ourFileRouter
