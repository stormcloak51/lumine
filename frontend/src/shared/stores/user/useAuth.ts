'use client'

import { EUserRoles, IUser } from '@/shared/config/types/user.types'
import { useUser } from '@/shared/stores/user/user.store'

// Define empty user for when user is not logged in
const emptyUser: IUser = {
  id: '',
  username: '',
  name: '',
  surname: '',
  userAvatar: '',
  userCover: '',
  bio: '',
  email: '',
  role: EUserRoles.USER,
  created_at: null,
  updated_at: null,
  friends: [],
  friendsOf: [],
}

export const useAuth = (): {
  isAuth: boolean
  user: IUser
  isLoading: boolean
} => {
  const data = useUser((state) => state.user)
  const hydrated = useUser((state) => state.hydrated)

  if (!data) {
    return {
      isAuth: false,
      user: emptyUser,
      isLoading: !hydrated,
    }
  }

  return {
    isAuth: true,
    user: data,
    isLoading: !hydrated,
  }
}
