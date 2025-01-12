"use server"

import { IAsset } from '@/shared/config/types/general.types'
import { utapi } from './utapi'

export const utapiDeleteFiles = async (file: IAsset) => {
	"use server"
	if (!file.key) return
	const result = await utapi.deleteFiles(file.key)
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