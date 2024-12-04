import { createUploadthing, type FileRouter } from "uploadthing/next";

export const f = createUploadthing();

export const ourFileRouter = {
  mediaPost: f({
		image: { maxFileSize: "8MB", maxFileCount: 5 },
		video: { maxFileSize: "256MB", maxFileCount: 2 }
	})
		.onUploadComplete(({file}) => {
			console.log('File URL:', file.url);
			const newUrl = file.url.replaceAll('/f/', `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`);
			console.log('New URL:', newUrl);
			return { url: newUrl };
		})
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;