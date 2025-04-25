import { PostCreate } from '@/features/post/create/index'
import { TPost } from '@/shared/config/types/post.types'
import { Button, Menu, Modal, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Edit, Ellipsis, Trash } from 'lucide-react'
import { useState } from 'react'

import { useManagePost } from '../model/useManagePost'
import { ModalDeleteUi } from '@/shared/ui/Modal/ui/modal-delete'

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
      <Menu trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Ellipsis />
        </Menu.Target>
        <Menu.Dropdown className="rounded-xl">
          <Menu.Item
            onClick={openEditPostModal}
            className="rounded-xl"
            leftSection={<Edit size={16} />}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={openDeletePostModal}
            className="rounded-xl"
            leftSection={<Trash size={16} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalDeleteUi
        opened={isDeletePostOpened}
        onClose={closeDeletePostModal}
        onSubmit={() => handleDelete(post.id)}
        entity="post"
      />
      <Modal
        opened={isEditPostOpened}
        onClose={closeEditPostModal}
        size={'md'}
        title="Write new story"
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
        <PostCreate content={editedContent} setContent={setEditedContent} />
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
          variant="outline"
        >
          Cancel
        </Button>
      </Modal>
    </>
  )
}
