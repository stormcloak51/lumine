import { Button, Text, useMantineTheme } from '@mantine/core'
import Link from 'next/link'

import { ModalUi } from './Modal'

interface ModalDeleteUiProps {
  opened: boolean
  onClose: () => void
	onSubmit: () => void
  title?: string
  entity: 'post' | 'comment' | 'friend'
}

export const ModalDeleteUi = ({
  opened,
  onClose,
	onSubmit,
  title,
  entity,
}: ModalDeleteUiProps) => {
  const theme = useMantineTheme()
  return (
    <ModalUi
      opened={opened}
      onClose={onClose}
      title={title || 'Are you sure?'}
      classNames={{ title: '!text-2xl font-semibold' }}
      radius={'lg'}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text mb={10}>Are you sure you want to delete this {entity}?</Text>
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
        onClick={onSubmit}
        mr={15}
        radius={'lg'}
        autoContrast
        color={theme.colors.myColor[4]}
      >
        Delete
      </Button>
      <Button
        onClick={onClose}
        radius={'lg'}
        color={theme.colors.myColor[4]}
        variant="outline"
      >
        Cancel
      </Button>
    </ModalUi>
  )
}