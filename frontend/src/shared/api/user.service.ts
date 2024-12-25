import { IUser, TEditProfile } from '../config/types/user.types'
import { api } from './base'

export class UserService {

  async getAllUsers() {
    const response = await api.get<IUser[]>('user/all')
    return response
  }

  // @cache
  async getProfile(id: string): Promise<IUser> {
    const response = await api.get<IUser>(`user/${id}`)
    return response
  }
  
  async update(dto: TEditProfile) {
    const response = await api.patch<Partial<IUser>>(`user`, dto as Partial<IUser>)
    return response
  }
}

export const userService = new UserService()