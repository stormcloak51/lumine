'use client'
import { authApi } from '@/shared/api/authApi'
import { uploadContent } from '@/shared/api/upload-content'
import { useUser } from '@/shared/stores/user/user.store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormData } from '../model/register.types'

export const useRegisterMutation = () => {
	const router = useRouter()
	const setUser = useUser(state => state.setUser)

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { avatar, agreeToTerms, ...rest } = data
			try {
				const userAvatar: string | undefined = await uploadContent(
					data.avatar as File,
					'accounts/' +
						data.username +
						'/' +
						'avatar.' +
						data.avatar?.type.split('/')[1],
					data.username
				)
				const user = await authApi.main('register', {
					userAvatar: userAvatar ? userAvatar : rest.username,
					...rest,
				})
				return user
			} catch (err) {
				console.log(err)
				return null
			}
		},
		onSuccess: data => {
			setUser(data!)
			router.push('/feed')
		},
	})

	return {
		mutate: mutation.mutate,
		isPending: mutation.isPending,
	}
}
