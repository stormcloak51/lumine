import { TCommentResponse } from '@/types/comment.types'
import LumineAvatar from '../LumineAvatar'
import purify from 'dompurify'
import { Text } from '@mantine/core'
import { Circle } from 'lucide-react'
import Link from 'next/link'
import { CommentActions } from './CommentActions'
import { useState } from 'react'

export const CommentItem = (comment: TCommentResponse) => {

	console.log(comment, 'COMMENNT')
	return (
		<div className='flex flex-row gap-x-2'>
			<LumineAvatar
				size={30}
				url={comment.user.userAvatar}
				username={comment.user.username}
			/>
			<div className='w-full border-b border-[rgb(66,66,66)]'>
				<Link
					href={`/profile/${comment.user.username}`}
					className='flex items-center gap-x-3'
				>
					<Text size='md' fw={700}>
						{comment.user.name}
					</Text>
					<Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' />
					<Text c={'dimmed'}>1h ago</Text>
				</Link>
				<Text
					mt='sm'
					className='!mt-2 text-[rgba-(255, 255, 255, 0.7)] ProseMirror'
					dangerouslySetInnerHTML={{ __html: purify.sanitize(comment.content) }}
				/>
				<CommentActions comment={comment} />
			</div>
		</div>
	)
}
