'use client'
import { TCommentResponse } from '@/types/comment.types'
import LumineAvatar from '../common/LumineAvatar'
import purify from 'dompurify'
import { Text } from '@mantine/core'
import Link from 'next/link'
import { CommentActions } from './CommentActions'
import { timeAgo } from '@/lib/utils/timeAgo'
import { useSubComments } from '@/hooks/useSubComments'
import { CommentList } from './CommentList'

export const CommentItem = (comment: TCommentResponse) => {

	const {
		comments,
		isLoading,
		isCommentsVisible,
		toggleCommentsVisibility,
		fetchNextPage,
		hasNextPage,
	} = useSubComments({postId: comment.postId, commentId: comment.id})

	return (
		<div className='flex flex-row gap-x-2'>
			<LumineAvatar
				size={30}
				url={comment.user.userAvatar}
				username={comment.user.username}
			/>
			<div className='w-full border-b border-[rgb(0,0,0)]'>
				<Link
					href={`/profile/${comment.user.username}`}
					className='flex items-center justify-between'
				>
					<Text size='md' fw={700}>
						{comment.user.name}
					</Text>
					{/* <Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' /> */}
					<Text c={'dimmed'}>{timeAgo(comment.created_at.toString())}</Text>
				</Link>
				<Text
					mt='sm'
					className='!mt-2 text-[rgba-(255, 255, 255, 0.7)] ProseMirror'
					dangerouslySetInnerHTML={{ __html: purify.sanitize(comment.content) }}
				/>
				<CommentActions onClickComment={toggleCommentsVisibility} comment={comment} />
				{
					comments && !isLoading && isCommentsVisible && <CommentList comments={comments} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
				}
			</div>
		</div>
	)
}
