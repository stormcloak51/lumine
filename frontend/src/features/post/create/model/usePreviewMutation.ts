import { postApi } from '@/shared/api/postApi'
import { utapiDeleteFiles } from '@/shared/api/uploadthing/actions'
import { IAsset } from '@/shared/config/types/general.types'
import { uploadFiles } from '@/shared/lib/uploadthing'
import { useMutation } from '@tanstack/react-query'

export const usePreviewMutation = () => {

  const createPreviewMutation = useMutation({
    mutationFn: async (files: File[]): Promise<IAsset[]> => {
      try {
        const result = await uploadFiles('mediaPost', {files})
        console.log(result, 'result')
        await postApi.upsertDraft({
          media: result.map(item => {
            return {
              url: item.serverData.url,
              key: item.serverData.key,
            }
          })
        })
        return result.map(item => {
          return {
            url: item.serverData.url,
            key: item.serverData.key
          }
        })
      } catch (error) {
        console.error('Upload Error:', error);
        throw error;
      }
    },
  });

  const deletePreviewMutation = useMutation({
    mutationFn: async (file: string) => {
      try {
        await utapiDeleteFiles(file)
      } catch (err) {
        console.log(err)
        return {
          success: false,
          message: `Something went wrong: ${err}`,
        }
      }
    },
  })


	return {
		createPreviewMutate: createPreviewMutation.mutateAsync,
		data: createPreviewMutation.data,
    isLoading: createPreviewMutation.isPending,
	}
}
