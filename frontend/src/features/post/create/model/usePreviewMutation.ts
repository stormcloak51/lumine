import { useUploadThing } from '@/shared/api/uploadthing/api'
import { useMutation } from '@tanstack/react-query'

export const usePreviewMutation = () => {

	const {startUpload} = useUploadThing('mediaPost')

	const mutation = useMutation({
		mutationFn: async (files: File[]) => {
			startUpload(files)
			return {}
		},
	})

	return {
		previewMutate: mutation.mutate,
	}
}
