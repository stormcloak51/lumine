import { useDebounce } from '@/shared/hooks/useDebounce'
import { postService } from '@/shared/api/post.service'
import { useQuery } from '@tanstack/react-query'
import { useMediaContentStore } from '@/shared/stores/post/post-mediacontent.store'
import { IPostDraft } from '@/shared/config/types/post.types'

export const useDraft = () => {

	const {media, setMedia} = useMediaContentStore()

	const draftQuery = useQuery({
		queryKey: ['draft'],
		queryFn: async () => {
			const res = await postService.findDraft()
			setMedia(res?.media)
			return res
		},
	})


	return {
		useDraftDebounce: useDebounce((value: string) => postService.upsertDraft({content: value, media }), 2000),
		data: draftQuery.data as IPostDraft | null,
		isLoading: draftQuery.isLoading
	}

}