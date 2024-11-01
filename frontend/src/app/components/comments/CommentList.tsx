'use client'

import { TCommentResponse } from '@/types/comment.types'
import { CommentItem } from './CommentItem'
import {Button, Text, Title} from '@mantine/core'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'

export const CommentList = ({comments, hasNextPage, fetchNextPage}: {comments: TCommentResponse[], hasNextPage: boolean, fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<TCommentResponse[], unknown>, Error>>}) => {

	console.log(comments, 'COOMMENTS')

	return (
		<div className='flex flex-col gap-y-4 mb-5'>
			{comments && comments.map(comment => (
				<CommentItem {...comment} key={`${comment.postId}/${comment.id}`}/>
			))}
			{hasNextPage && (
				<Button className='w-[25%] mx-auto rounded-lg' onClick={() => fetchNextPage()} style={{
					background: "linear-gradient(45deg, #ffb931 10%, #916000 90%)",
					color: "white",
					borderWidth: 0
				}}>
					Load more
				</Button>
			)}
		</div>
	)
}