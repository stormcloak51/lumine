"use server"

import { utapi } from './utapi'

export const utapiDeleteFiles = async (file: string) => {
	"use server"
	const result = await utapi.deleteFiles('Em1u6KysRyuViUpdRR9UA86ZO1rGCjYNcEtvlFqgkSKVX2m0')
	if (result.success) {
		return {
			success: true,
			message: 'File deleted successfully',
		}
	} else {
		return {
			success: false,
			message: 'Something went wrong',
		}
	}
}