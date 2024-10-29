'use client'
import { useAuth } from '@/lib/actions/state'
import { unlikePost, likePost } from '@/lib/actions/updatePost'
import { TPost } from '@/types/post.types'
import { Button } from '@mantine/core'
import { Forward, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export const PostActions = ({ post, onClickComment, commentsCount }: { post: TPost, onClickComment: () => void, commentsCount: number }) => {
	const { user } = useAuth()

	const [localLikes, setLocalLikes] = useState(post?.likes)
	const [isLiked, setLiked] = useState(
		post?.UserLike?.find(u => u.userId === user?.id) !== undefined
	)

	const handleLike = async () => {
		if (isLiked) {
			setLiked(false)
			setLocalLikes(prev => prev - 1)
			return await unlikePost({
				postId: post.id,
				user: user,
			})
		}

		setLiked(true)
		setLocalLikes(prev => prev + 1)
		return await likePost({
			postId: post.id,
			user: user,
		})
	}
	return (
		<>
			<Button
				onClick={handleLike}
				leftSection={
					<Heart
						fill={isLiked ? '#F74440' : 'transparent'}
						stroke={isLiked ? '#F74440' : 'white'}
						size={18}
					/>
				}
				rightSection={localLikes}
				className={`bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)] ${
					isLiked && `bg-[#1E1A1B]`
				}`}
				styles={{
					section: {
						margin: '0px',
					},
					inner: {
						display: 'flex',
						columnGap: '2px',
					},
				}}
			></Button>
			<Button
				leftSection={<MessageCircle size={18} />}
				rightSection={commentsCount}
				onClick={() => onClickComment()}
				className={`bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]`}
				styles={{
					section: {
						margin: '0px',
					},
					inner: {
						display: 'flex',
						columnGap: '2px',
					},
				}}
			></Button>
			<Button className='bg-[#2a2a2a] !px-3 transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]'>
				<Forward size={18} />
			</Button>
		</>
	)
}
