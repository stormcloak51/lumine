'use client'

import { uploadContent } from '@/shared/api/upload-content'
import { RegisterFormData } from '@/shared/config/types/auth.types'
import { useUser } from '@/shared/stores/user/user.store'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '../../services/auth.service'

export const useRegisterMutation = () => {
  const router = useRouter()
  const setUser = useUser((state) => state.setUser)

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
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
        const user = await authService.register({
          userAvatar: userAvatar ? userAvatar : rest.username,
          ...rest,
        })
        return user
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    onSuccess: (data) => {
      console.log(data, 'DATA')
      setUser(data!)
      router.push('/feed')
    },
    onError: (error) => {
      console.error(error)
      notifications.show({
        title: 'Something went wrong',
        message: error.message,
        color: 'red',
      })
    },
  })

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  }
}
