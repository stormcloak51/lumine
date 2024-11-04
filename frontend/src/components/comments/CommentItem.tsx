'use client'
import { CommentRoles, TCommentResponse } from '@/types/comment.types'
import LumineAvatar from '../common/LumineAvatar'
import purify from 'dompurify'
import { Text } from '@mantine/core'
import { CommentActions } from './CommentActions'
import { timeAgo } from '@/lib/utils/timeAgo'
import { useSubComments } from '@/hooks/useSubComments'
import { CommentList } from './CommentList'
import { UserHoverCard } from '../common/UserHoverCard'
import { CommentCreate } from './CommentCreate'

interface props {
	comment: TCommentResponse
	role?: CommentRoles
}

export const CommentItem = ({ comment, role }: props) => {
	console.log(comment)
	const {
		comments,
		isLoading,
		createSubcomment,
		likeSubComment,
		isCommentsVisible,
		toggleCommentsVisibility,
		fetchNextPage,
		hasNextPage,
	} = useSubComments({ postId: comment.postId, commentId: comment.id })

	return (
		<div className='flex flex-row gap-x-2'>
			<LumineAvatar size={30} url={comment.user.userAvatar} username={comment.user.username} />
			<div className='w-full border-b border-[rgb(66,66,66)]'>
				<div className='flex flex-row items-center gap-x-3'>
					<UserHoverCard ml={0} targetSize='md' user={comment.user} />
					<Text size='md' c={'dimmed'}>
						{timeAgo(comment.created_at.toString())}
					</Text>
				</div>

				<Text
					mt='sm'
					className='!mt-2 text-[rgba-(255, 255, 255, 0.7)] ProseMirror'
					dangerouslySetInnerHTML={{ __html: purify.sanitize(comment.content) }}
				/>
				<CommentActions role={role} onClickComment={toggleCommentsVisibility} comment={comment} />
				{comments && !isLoading && isCommentsVisible && (
					<>
						<CommentCreate
							onSubmit={data => {
								setCommentLength(prev => prev + 1)
								createSubcomment(data)
								if (!isCommentsVisible) toggleCommentsVisibility()
							}}
							postId={comment.postId}
						/>
						<CommentList
							comments={comments}
							hasNextPage={hasNextPage}
							fetchNextPage={fetchNextPage}
						/>
					</>
				)}
			</div>
		</div>
	)
}