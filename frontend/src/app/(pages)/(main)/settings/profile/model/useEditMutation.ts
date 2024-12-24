import { userService } from '@/shared/api/user.service'
import { IUser, TEditProfile } from '@/shared/config/types/user.types'
import { useUser } from '@/shared/stores/user/user.store'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useEditMutation = () => {
	const { setUser } = useUser()
	const mutation = useMutation({
		mutationFn: async (data: Partial<TEditProfile>) => {
			return await userService.update(data)
		},
		onSuccess: (data: Partial<IUser>) => {
			setUser(data)
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
