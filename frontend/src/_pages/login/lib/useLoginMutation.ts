'use client'
import { useMutation } from '@tanstack/react-query'
import {FormData} from '../model/login.types'
import { authApi } from '@/shared/api/authApi'
import { useRouter } from 'next/navigation'
import { useUser } from '@/shared/stores/user.store'
import { useState } from 'react'

export const useLoginMutation = () => {
	const router = useRouter()
	const setUser = useUser(state => state.setUser)
	const [pending, setPending] = useState(false)
	const [redirecting, setRedirecting] = useState(false)

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			try {
				const user = await authApi.main('login', data)
				return user
			} catch (err) {
				console.log(err)
				return null
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