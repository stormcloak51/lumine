import { Modal, ModalProps } from '@mantine/core'
import { ReactNode } from 'react'

export interface ModalUiProps extends ModalProps {
  opened: boolean
  onClose: () => void
  title: string
	children: ReactNode
}

export const ModalUi = ({ opened, onClose, title, children, ...props }: ModalUiProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      classNames={{
        title: '!text-2xl font-semibold',
      }}
      radius={'lg'}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      {...props}
    >
      {children}
    </Modal>
  )
}
