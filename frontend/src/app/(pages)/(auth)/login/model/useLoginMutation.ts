'use client'
import { authService } from '../../services/auth.service'
import { useUser } from '@/shared/stores/user/user.store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoginFormData } from '@/shared/config/types/auth.types'
import { notifications } from '@mantine/notifications'

export const useLoginMutation = () => {
	const router = useRouter()
	const setUser = useUser(state => state.setUser)
	const [pending, setPending] = useState(false)
	const [redirecting, setRedirecting] = useState(false)

	const mutation = useMutation({
		mutationFn: async (data: LoginFormData) => {
			try {
				const user = await authService.login(data)
				return user
			} catch (err: any) {
				console.log(err)
				notifications.show({
					color: 'red',
					title: `Error ${err.statusCode}`,
					message: err.message,
				})
			}
		},
		onMutate: () => {
			if (!redirecting) {
				setPending(true)
			}
		},
		onSettled: () => setPending(false),
		onSuccess: data => {
			if (data) {
				setUser(data)
				router.push('/feed')
				setRedirecting(true)
			}
		},
	})

	return {
		mutate: mutation.mutate,
		isPending: pending,
	}
}
