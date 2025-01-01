'use client'

import { useAuth } from '@/shared/stores/user/useAuth'
import { Button } from '@mantine/core'
import { Pen } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface IChagneCredentials {
  currId: string
}

export const ChangeCredentials: FC<IChagneCredentials> = ({ currId }) => {
  const {
    user: { id },
  } = useAuth()

  if (id !== currId) {
    return null
  }
  return (
    <Button
      component={Link}
      href={'/settings/profile'}
      className="text-[16px] font-sans"
      leftSection={<Pen size={20} />}
      color={'#ffd37d'}
      variant={'light'}
    >
      Change
    </Button>
  )
}
