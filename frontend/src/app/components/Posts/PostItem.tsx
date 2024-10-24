'use client'
import { TPost } from '@/types/post.types'
import {
	ActionIcon,
	Blockquote,
	Button,
	Card,
	HoverCard,
	Text,
	Title,
	useMantineTheme,
	Menu,
	Modal,
} from '@mantine/core'
import { FC, useState } from 'react'
import LumineAvatar from '../LumineAvatar'
import purify from 'dompurify'
import { timeAgo } from '@/lib/utils/timeAgo'
import { DMSans } from '@/fonts/fonts'
import {
	Circle,
	Ellipsis,
	Forward,
	Heart,
	MessageCircle,
	MessagesSquare,
	Pen,
	Quote,
	Trash,
	UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/actions/state'
import { likePost, unlikePost } from '@/lib/actions/updatePost'
import { useDisclosure } from '@mantine/hooks'

export const PostItem: FC<TPost & { title: string }> = post => {
	const [isDeletePostOpened, { open: openDeletePostModal, close: closeDeletePostModal }] =
		useDisclosure(false)
	const theme = useMantineTheme()
	const { user } = useAuth()

	const [localLikes, setLocalLikes] = useState(post?.likes)
	const [isLiked, setLiked] = useState(
		post?.UserLike?.find(u => u.userId === user?.id) !== undefined,
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
		<Card
			className={`!bg-[#1f2124] shadow-lg rounded-lg border border-[rgb(66,66,66)] ${DMSans.className}`}
			key={post.id}
			withBorder
			shadow='sm'
			radius='md'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-row gap-x-4 items-center'>
					<LumineAvatar size={40} url={post.User.userAvatar} username={post.User.username} />
					<HoverCard shadow='xl' openDelay={700}>
						<HoverCard.Target>
							<Text
								href={`/profile/${post.User.username}`}
								component={Link}
								className='hover:underline cursor-pointer'
								ml={-8}
								size='lg'
								fw={700}>
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
							}}>
							<LumineAvatar size={50} url={post.User.userAvatar} username={post.User.username} />
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
										<ActionIcon color={theme.colors.myColor[0]} variant='outline'>
											<UserPlus size={20} />
										</ActionIcon>
										<ActionIcon color={theme.colors.myColor[0]} variant='outline'>
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
									}}>
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
				</div>
				{user?.id === post.User.id && (
					<>
						<Menu trigger='hover' openDelay={100} closeDelay={400}>
							<Menu.Target>
								<Ellipsis />
							</Menu.Target>
							<Menu.Dropdown className='rounded-xl'>
								<Menu.Item className='rounded-xl' leftSection={<Pen size={16} />}>
									Edit
								</Menu.Item>
								<Menu.Item
									onClick={openDeletePostModal}
									className='rounded-xl'
									leftSection={<Trash size={16} />}>
									Delete
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Modal
							opened={isDeletePostOpened}
							onClose={closeDeletePostModal}
							title='Are you sure?'
							centered
							classNames={{
								title: '!text-2xl font-semibold',
							}}
							className={`${DMSans.className}`}
							radius={'lg'}
							overlayProps={{
								backgroundOpacity: 0.55,
								blur: 3,
							}}>
							<Text mb={10}>This action will delete your post and it cannot be undone</Text>
							<Button mr={15} radius={'lg'} autoContrast color={theme.colors.myColor[4]} >Delete</Button>
							<Button onClick={closeDeletePostModal} radius={'lg'} color={theme.colors.myColor[4]} variant='outline'>Cancel</Button>
						</Modal>
					</>
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
					}}></Button>
				<Button
					leftSection={<MessageCircle size={18} />}
					rightSection={12}
					className={`bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]`}
					styles={{
						section: {
							margin: '0px',
						},
						inner: {
							display: 'flex',
							columnGap: '2px',
						},
					}}></Button>
				<Button className='bg-[#2a2a2a] !px-3 transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]'>
					<Forward size={18} />
				</Button>
			</div>
		</Card>
	)
}
