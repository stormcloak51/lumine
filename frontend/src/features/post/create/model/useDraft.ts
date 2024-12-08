import { useDebounce } from '@/shared/hooks/useDebounce'
import { useMediaContentStore } from '@/shared/stores/post-mediacontent.store'
import {postApi} from '@/shared/api/postApi'
import { useQuery } from '@tanstack/react-query'

export const useDraft = () => {

	const { content } = useMediaContentStore()
	const draftQuery = useQuery({
		queryKey: ['draft'],
		queryFn: async () => await postApi.findDraft(),
	})


	return {
		useDraftDebounce: useDebounce((value: string) => postApi.upsertDraft({content: value, media: content}), 2000),
		data: draftQuery.data,
		isLoading: draftQuery.isLoading
	}

}