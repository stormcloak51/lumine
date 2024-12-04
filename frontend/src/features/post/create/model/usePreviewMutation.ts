import { uploadFiles } from '../../../../../app/api/uploadthing/api'
import { useMutation } from '@tanstack/react-query'

export const usePreviewMutation = () => {

	

  const mutation = useMutation({
    mutationFn: async (files: File[]) => {
      try {
        const result = await uploadFiles('mediaPost', {files})
        console.log('Upload Result:', result);
        return { data: result };
      } catch (error) {
        console.error('Upload Error:', error);
        throw error;
      }
    },
  });

	return {
		previewMutate: mutation.mutate,
		data: mutation.data
	}
}
