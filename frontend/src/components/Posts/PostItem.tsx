'use client'
import { TPost } from '@/types/post.types'
import {
	Card,
	Divider,
	Text,
} from '@mantine/core'
import { FC, useState } from 'react'
import LumineAvatar from '../common/LumineAvatar'
import purify from 'dompurify'
import { timeAgo } from '@/lib/utils/timeAgo'
import { DMSans } from '@/fonts/fonts'
import {
	Circle,
	LoaderCircle,
} from 'lucide-react'
import { useAuth } from '@/lib/actions/state'
import { ManagePost } from './ManagePost'
import { PostActions } from './PostActions'
import { CommentCreate } from '../comments/CommentCreate'
import { CommentList } from '../comments/CommentList'
import { useComments } from '@/hooks/useComments'
import { UserHoverCard } from '../common/UserHoverCard'

export const PostItem: FC<
	TPost & { title: string; lastPostRef?: React.Ref<HTMLDivElement> }
> = post => {

	const { user } = useAuth()

	const [commentLength, setCommentLength] = useState(post?.Comment?.length)

	const {
		comments,
		isLoading,
		createComment,
		toggleCommentsVisibility,
		isCommentsVisible,
		hasNextPage,
		fetchNextPage,
	} = useComments(post.id)

	
	return (
		<Card
			ref={post.lastPostRef}
			className={`!bg-[#1f2124] shadow-lg rounded-lg border border-[rgb(66,66,66)] ${DMSans.className}`}
			key={post.id}
			withBorder
			shadow='sm'
			radius='md'
		>
			<div className='flex justify-between items-center'>
				<div className='flex flex-row gap-x-4 items-center'>
					<LumineAvatar
						size={40}
						url={post.User.userAvatar}
						username={post.User.username}
					/>
					<UserHoverCard user={post.User}/>
					<Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' />
					<Text c='dimmed' size='md'>
						{timeAgo(post.created_at)}
					</Text>
				</div>
				{user?.id === post.User.id && (
					<ManagePost
						post={post}
						id={post.id}
						content={post.content}
						userId={post.User.id}
					/>
				)}
			</div>
			<div
				className='w-full h-[1px] !px-0 my-2 '
				style={{
					background:
						'linear-gradient(90deg, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
					opacity: 0.32,
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				}}
			/>
			<Text
				mt='sm'
				className='text-white ProseMirror'
				dangerouslySetInnerHTML={{ __html: purify.sanitize(post.content) }}
			/>
			<div className='mt-4 flex gap-x-3'>
				<PostActions post={post} onClickComment={toggleCommentsVisibility} commentsCount={commentLength} />
			</div>
			<Divider
				className='!w-[calc(100%+var(--mantine-spacing-md)*2)] -mx-[var(--mantine-spacing-md)]'
				my={'sm'}
			/>
			{isLoading && (
				<LoaderCircle className='animate-spin w-full mx-auto mb-5' size={34} />
			)}
			{isCommentsVisible && comments && comments?.length > 0 && !isLoading && <CommentList hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} comments={comments} />}
			<CommentCreate
				onSubmit={data => {
					setCommentLength(prev => prev + 1)
					createComment(data)
					if (!isCommentsVisible) toggleCommentsVisibility()
				}}
				postId={post.id}
			/>
		</Card>
	)
}
