import { createUploadthing, type FileRouter } from "uploadthing/next";
import { useAuth } from '@/shared/lib/useAuth'
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  mediaPost: f({
		image: { maxFileSize: "8MB", maxFileCount: 5 },
		video: { maxFileSize: "256MB", maxFileCount: 2 }
	})
	  .middleware((req) => {
			const {user: {id}} = useAuth()

			if (!id) throw new UploadThingError('Unauthorized')
			
			return { userId: id }
		})
		.onUploadComplete(({file}) => {
       console.log(file.url)
		})
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;