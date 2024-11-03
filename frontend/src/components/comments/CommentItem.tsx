'use client'
import { CommentRoles, TCommentResponse } from '@/types/comment.types'
import LumineAvatar from '../common/LumineAvatar'
import purify from 'dompurify'
import { Text } from '@mantine/core'
import Link from 'next/link'
import { CommentActions } from './CommentActions'
import { timeAgo } from '@/lib/utils/timeAgo'
import { useSubComments } from '@/hooks/useSubComments'
import { CommentList } from './CommentList'

interface props {
	comment: TCommentResponse
	role?: CommentRoles
}

export const CommentItem = ({comment, role}: props) => {
	console.log(comment);
	const {
		comments,
		isLoading,
		isCommentsVisible,
		toggleCommentsVisibility,
		fetchNextPage,
		hasNextPage,
	} = useSubComments({ postId: comment.postId, commentId: comment.id })

	return (
		<div className='flex flex-row gap-x-2'>
			<LumineAvatar size={30} url={comment.user.userAvatar} username={comment.user.username} />
			<div className='w-full border-b border-[rgb(0,0,0)]'>
				<div className='flex flex-row items-center gap-x-3'>
					<Link href={`/profile/${comment.user.username}`} className=''>
						<Text size='md' fw={700}>
							{comment.user.name}
						</Text>
						{/* <Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' /> */}
					</Link>
					<Text c={'dimmed'}>{timeAgo(comment.created_at.toString())}</Text>
				</div>

				<Text
					mt='sm'
					className='!mt-2 text-[rgba-(255, 255, 255, 0.7)] ProseMirror'
					dangerouslySetInnerHTML={{ __html: purify.sanitize(comment.content) }}
				/>
				<CommentActions role={role} onClickComment={toggleCommentsVisibility} comment={comment} />
				{comments && !isLoading && isCommentsVisible && (
					<CommentList
						comments={comments}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
					/>
				)}
			</div>
		</div>
	)
}
