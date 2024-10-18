'use client'

import { useAuth } from '@/lib/actions/state'
import { Button } from '@mantine/core'
import { Pen } from 'lucide-react'
import { FC } from 'react'

interface IChagneCredentials {
	currId: string
}

export const ChangeCredentials: FC<IChagneCredentials> = ({ currId }) => {
	const {
		user: {
			 id,
		},
	} = useAuth()

	if (id !== currId) {
		return null
	}
	return (
		<Button
			className='text-[16px] font-sans'
			leftSection={<Pen size={20} />}
			color={'#ffd37d'}
			variant={'light'}>
			Change
		</Button>
	)
}
