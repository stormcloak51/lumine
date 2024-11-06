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

export const CommentItem = ({ comment, role = CommentRoles.MAINCOMMENT }: props) => {
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

	console.log(comment.content, role)
	return (
		<div className='flex flex-row gap-x-2'>
			<LumineAvatar size={30} url={comment.user.userAvatar} username={comment.user.username} />
			<div className={`w-full ${role === CommentRoles.MAINCOMMENT ? 'border-b border-[rgb(66,66,66)]' : ''}`}>
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
				{comments && !isLoading && isCommentsVisible && role !== CommentRoles.SUBCOMMENT && (
					<div className={comments.length > 0 ? 'mt-3' : ''}>
						<CommentList
							comments={comments}
							hasNextPage={hasNextPage}
							fetchNextPage={fetchNextPage}
						/>
						<CommentCreate
							cl='mb-5'
							commentId={comment.id}
							onSubmit={data => {
								// setCommentLength(prev => prev + 1)
								if (data.commentId) {
									createSubcomment(data)
									if (!isCommentsVisible) toggleCommentsVisibility()
								}
							}}
							postId={comment.postId}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
