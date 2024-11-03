'use client'
import { useComments } from '@/hooks/useComments'
import { useSubComments } from '@/hooks/useSubComments'
import { useAuth } from '@/lib/actions/state'
import { TCommentResponse } from '@/types/comment.types'
import { Button, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BiSolidMessageRoundedDots } from 'react-icons/bi'
import { FaEllipsis } from "react-icons/fa6";

interface ICommentActions {
	comment: TCommentResponse
	onClickComment: () => void
}

export const CommentActions = ({ comment, onClickComment }: ICommentActions) => {
	const {
		user: { id },
	} = useAuth()


	const {likeComment} = useComments(comment.postId)

	const [isCommentLiked, setIsCommentLiked] = useState(
		comment?.Like?.find(u => u.userId === id) !== undefined
	)
	
	const [localLikes, setLocalLikes] = useState(comment?.Like.length)

	useEffect(() => {
		setLocalLikes(comment?.Like.length)
		setIsCommentLiked(comment?.Like?.find(u => u.userId === id) !== undefined)
	}, [comment, id])


	const theme = useMantineTheme()

	return (
		<div className='flex flex-row gap-x-4'>
			<Button
				p={0}
				color={
					isCommentLiked ? theme.colors.myColor[5] : theme.colors.myColor[2]
				}
				className='flex items-center'
				onClick={() => {
					if (isCommentLiked) {
						likeComment({postId: comment.postId, userId: id, commentId: comment.id})
						setLocalLikes(prev => prev - 1)
						setIsCommentLiked(false)
					} else {
						likeComment({postId: comment.postId, userId: id, commentId: comment.id})
						setLocalLikes(prev => prev + 1)
						setIsCommentLiked(true)
					}
				}}
				variant='transparent'
			>
				<AiFillLike />
				<span className='ml-1'>{localLikes}</span>
			</Button>
			<Button
				p={0}
				color={theme.colors.myColor[2]}
				rightSection={comment.subComments?.length}
				classNames={{
					section: 'ml-1',
				}}
				onClick={onClickComment}
				variant='transparent'
			>
				<BiSolidMessageRoundedDots />
			</Button>
			<Button
				p={0}
				color={theme.colors.myColor[2]}
				classNames={{
					section: 'ml-1',
				}}
				variant='transparent'
			>
				<FaEllipsis />
			</Button>
		</div>
	)
}
