import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  mediaPost: f({
		image: { maxFileSize: "8MB", maxFileCount: 5 },
		video: { maxFileSize: "256MB", maxFileCount: 2 }
	})
	  .middleware(req => {
			const token = req.req.cookies.get('refresh_token')?.value

			if (!token) {
				throw new UploadThingError('Unauthorized')
			}

			return { isAuth: true, token }
		})
		.onUploadComplete(({metadata, file}) => {
			console.log(file.url)
			console.log(metadata)
      //  const newUrl = file.url.replaceAll
			return {url: file.url}
		})
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;