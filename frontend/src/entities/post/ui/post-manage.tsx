import { PostCreate } from '@/features/post/create/index'
import { TPost } from '@/shared/config/types/post.types'
import { Button, Menu, Modal, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Edit, Ellipsis, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useManagePost } from '../model/useManagePost'

interface IManagePost {
	post: TPost
	content: string
}

export const ManagePost = ({ post, content }: IManagePost) => {
	const [
		isDeletePostOpened,
		{ open: openDeletePostModal, close: closeDeletePostModal },
	] = useDisclosure(false)

	const [
		isEditPostOpened,
		{ open: openEditPostModal, close: closeEditPostModal },
	] = useDisclosure(false)

	const [editedContent, setEditedContent] = useState(content)
	const theme = useMantineTheme()

	const { handleEdit, handleDelete } = useManagePost({
		closeDeletePostModal,
		closeEditPostModal,
	})
	return (
		<>
			<Menu trigger='hover' openDelay={100} closeDelay={400}>
				<Menu.Target>
					<Ellipsis />
				</Menu.Target>
				<Menu.Dropdown className='rounded-xl'>
					<Menu.Item
						onClick={openEditPostModal}
						className='rounded-xl'
						leftSection={<Edit size={16} />}
					>
						Edit
					</Menu.Item>
					<Menu.Item
						onClick={openDeletePostModal}
						className='rounded-xl'
						leftSection={<Trash size={16} />}
					>
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
				
				radius={'lg'}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<Text mb={10}>
					This action will delete your post and it cannot be undone.
				</Text>
				<Text c={'dimmed'} mb={15}>
					By the way, You can disable onDelete warnings in{' '}
					<Link
						className={`text-[${theme.colors.myColor[0]}] underline underline-offset-2`}
						href={'/settings/misc'}
					>
						settings
					</Link>
				</Text>
				<Button
					onClick={() => handleDelete(post.id)}
					mr={15}
					radius={'lg'}
					autoContrast
					color={theme.colors.myColor[4]}
				>
					Delete
				</Button>
				<Button
					onClick={closeDeletePostModal}
					radius={'lg'}
					color={theme.colors.myColor[4]}
					variant='outline'
				>
					Cancel
				</Button>
			</Modal>
			<Modal
				opened={isEditPostOpened}
				onClose={closeEditPostModal}
				size={'md'}
				title='Write new story'
				centered
				classNames={{
					title: '!text-2xl font-semibold',
					header: '!pb-[5px]',
				}}
				className={`w-auto`}
				radius={'lg'}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<Text c={'dimmed'} mb={10}>
					This action will edit your post
				</Text>
				<PostCreate content={content} />
				<Button
					onClick={() => handleEdit({ content: editedContent, id: post.id })}
					mr={15}
					radius={'lg'}
					autoContrast
					color={theme.colors.myColor[4]}
				>
					Edit
				</Button>
				<Button
					onClick={closeEditPostModal}
					radius={'lg'}
					color={theme.colors.myColor[4]}
					variant='outline'
				>
					Cancel
				</Button>
			</Modal>
		</>
	)
}
