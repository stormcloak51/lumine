import { userApi } from '@/shared/api/userApi'
import { IUserCredentials } from '@/shared/config/types/user.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import { useUser } from '@/shared/stores/user/user.store'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { EditProfileFormValues } from './edit.types'

export const useEditMutation = () => {
	const { setUser } = useUser()
	const {
		user: { id },
	} = useAuth()
	const mutation = useMutation({
		mutationFn: async (data: Partial<EditProfileFormValues>) => {
			return await userApi.update({
				id,
				dto: data,
			})
		},
		onSuccess: (data: IUserCredentials) => {
			setUser({ user: data })
			console.log('SUCCESFFULY EDITED')
		},
		onError: (res: AxiosError) => {
			return res.response?.data
		},
	})
	return {
		mutate: mutation.mutate,
		errors: mutation.error?.response?.data as {
			message: string
			statusCode: number
		},
	}
}
