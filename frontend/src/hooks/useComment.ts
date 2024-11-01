import { commentService } from '@/services/comment.service'
import { useQuery } from '@tanstack/react-query'



export const useComment = ({postId, commentId}: {postId: number, commentId: number}) => {


	const {data: comment} = useQuery({
		queryKey: ['comment', postId, commentId],
		queryFn: () => {
			commentService.getById(postId, commentId)
		}
	})

	return {
		comment
	}
}