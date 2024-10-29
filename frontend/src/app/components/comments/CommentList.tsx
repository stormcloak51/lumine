'use client'

import { TCommentResponse } from '@/types/comment.types'
import { CommentItem } from './CommentItem'
import {Text, Title} from '@mantine/core'

export const CommentList = ({comments}: {comments: TCommentResponse[]}) => {
	return (
		<div className='flex flex-col gap-y-4 mb-5'>
			{comments && comments.map(comment => (
				<CommentItem {...comment} key={`${comment.postId}/${comment.id}`}/>
			))}
		</div>
	)
}