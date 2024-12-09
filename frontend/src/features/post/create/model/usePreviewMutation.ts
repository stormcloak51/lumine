import { uploadFiles } from '@/shared/lib/uploadthing'
import { useMutation } from '@tanstack/react-query'

export const usePreviewMutation = () => {

  const mutation = useMutation({
    mutationFn: async (files: File[]): Promise<string[]> => {
      try {
        const result = await uploadFiles('mediaPost', {files})
        return result.map(item => {
          return item.url
        })
      } catch (error) {
        console.error('Upload Error:', error);
        throw error;
      }
    },
  });

	return {
		previewMutate: mutation.mutateAsync,
		data: mutation.data,
    isLoading: mutation.isPending,
	}
}
