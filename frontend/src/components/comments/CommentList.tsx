'use client'

import { CommentRoles, TCommentResponse } from '@/types/comment.types'
import { CommentItem } from './CommentItem'
import {Button} from '@mantine/core'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { TPaginatedResponse } from '@/types/general.types'

interface ICommmentList {
	comments: TCommentResponse[],
	hasNextPage: boolean,
	fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<TPaginatedResponse<TCommentResponse>>, unknown>>
}

export const CommentList = ({comments, hasNextPage, fetchNextPage}: ICommmentList) => {


	return (
		<div className='flex flex-col gap-y-4 mb-5'>
			{comments && comments.map(comment => (
				<CommentItem role={comment.parrentId ? CommentRoles.SUBCOMMENT : CommentRoles.MAINCOMMENT} comment={comment} key={`${comment.postId}/${comment.id}`}/>
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