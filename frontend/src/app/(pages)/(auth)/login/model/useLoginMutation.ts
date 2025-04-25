'use client'

import { LoginFormData } from '@/shared/config/types/auth.types'
import { useUser } from '@/shared/stores/user/user.store'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '../../services/auth.service'

export const useLoginMutation = () => {
  const router = useRouter()
  const setUser = useUser((state) => state.setUser)

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await authService.login(data)
    },
    onSuccess: (data) => {
      console.log(data)
      if (data) {
        setUser(data)
        router.push('/feed')
      }
    },
    onError: (error: any) => {
      // Show error notification without causing page reload
      notifications.show({
        color: 'red',
        title: `Authentication Failed`,
        message: error.message || 'Invalid credentials',
      })
    },
  })

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  }
}
