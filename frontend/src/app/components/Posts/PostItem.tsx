'use client'
import { TPost } from '@/types/post.types'
import {
	ActionIcon,
	Blockquote,
	Card,
	Divider,
	HoverCard,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { FC, useState } from 'react'
import LumineAvatar from '../LumineAvatar'
import purify from 'dompurify'
import { timeAgo } from '@/lib/utils/timeAgo'
import { DMSans } from '@/fonts/fonts'
import {
	Circle,
	LoaderCircle,
	MessagesSquare,
	Quote,
	UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/actions/state'
import { ManagePost } from './ManagePost'
import { PostActions } from './PostActions'
import { CommentCreate } from '../comments/CommentCreate'
import { CommentList } from '../comments/CommentList'
import { useComments } from '@/hooks/useComments'
import { CommentItem } from '../comments/CommentItem'

export const PostItem: FC<
	TPost & { title: string; lastPostRef?: React.Ref<HTMLDivElement> }
> = post => {
	const theme = useMantineTheme()
	const { user } = useAuth()

	const [postState, setPostState] = useState(post)

	const [commentLength, setCommentLength] = useState(post?.Comment?.length)

	const {
		comments,
		isLoading,
		createComment,
		toggleCommentsVisibility,
		isCommentsVisible,
		hasNextPage,
		fetchNextPage,
		createdComment
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
					<HoverCard shadow='xl' openDelay={700}>
						<HoverCard.Target>
							<Text
								href={`/profile/${post.User.username}`}
								component={Link}
								className='hover:underline cursor-pointer'
								ml={-8}
								size='lg'
								fw={700}
							>
								{post.User.name} {post.User.surname}
							</Text>
						</HoverCard.Target>
						<HoverCard.Dropdown
							className='flex flex-row gap-x-4 rounded-xl'
							style={{
								border: '1px solid rgba(255, 200, 100, 0.15)',
								backgroundColor: 'rgba(31, 33, 36, 0.8)',
								backdropFilter: 'blur(6px)',
								boxShadow: '0 0 15px rgba(255, 184, 56, 0.1)',
							}}
						>
							<LumineAvatar
								size={50}
								url={post.User.userAvatar}
								username={post.User.username}
							/>
							<div className=''>
								<div className='flex justify-between'>
									<div>
										<Title order={3}>
											{post.User.name} {post.User.surname}
										</Title>
										<Title mb={20} c='dimmed' order={4}>
											@{post.User.username}
										</Title>
									</div>
									<div className='flex flex-row gap-x-2'>
										<ActionIcon
											color={theme.colors.myColor[0]}
											variant='outline'
										>
											<UserPlus size={20} />
										</ActionIcon>
										<ActionIcon
											color={theme.colors.myColor[0]}
											variant='outline'
										>
											<MessagesSquare size={20} />
										</ActionIcon>
									</div>
								</div>
								<Blockquote
									maw={400}
									color={'#ffd37d'}
									iconSize={30}
									icon={<Quote size={16} />}
									className='pt-3 pl-5 whitespace-normal break-words'
									cite={post.User.name + ' ' + post.User.surname}
									styles={{
										icon: {
											border: '1px solid #ffd37d',
										},
									}}
								>
									<i>
										{post.User.bio === ''
											? 'No bio yet :( lorem15123123lkawmdkjaskjdaklsdmalkdsmalksdmalkdsmalksdm msdlkm askldma klsda lksdmal sdma'
											: post.User.bio}
									</i>
								</Blockquote>
							</div>
						</HoverCard.Dropdown>
					</HoverCard>
					<Circle fill='#ffdd9a' size={8} stroke='#ffdd9a' />
					<Text c='dimmed' size='md'>
						{timeAgo(post.created_at)}
					</Text>
					{/* <Text c='dimmed' size='md'>
						{timeAgo(post.updated_at)}
					</Text> */}
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
				<PostActions comments={comments && comments[0]?.data} post={post} onClickComment={toggleCommentsVisibility} commentsCount={commentLength} />
			</div>
			<Divider
				className='!w-[calc(100%+var(--mantine-spacing-md)*2)] -mx-[var(--mantine-spacing-md)]'
				my={'sm'}
			/>
			{isLoading && (
				<LoaderCircle className='animate-spin w-full mx-auto mb-5' size={34} />
			)}
			{createdComment && <CommentItem {...createdComment} key={createdComment.id} />}
			{isCommentsVisible && comments && comments?.length > 0 && !isLoading && <CommentList hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} comments={comments && comments[0]?.data} />}
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
