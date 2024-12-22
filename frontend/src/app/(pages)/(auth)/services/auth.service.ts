import { api } from '@/shared/api/instance.api'
import { TLogin, TRegister } from '@/shared/config/types/auth.types'
import { IUser } from '@/shared/config/types/user.types'


class AuthService {
	private baseUrl = '/auth'

	async register(body: TRegister) {
		const response = await api.post<IUser>(`${this.baseUrl}/register`, body)

		return response
	}

	async login(body: TLogin) {
		const response = await api.post<IUser>(`${this.baseUrl}/login`, body)

		return response
	}

	async logout() {
		const response = await api.post(`${this.baseUrl}/logout`)

		return response
	}

}

export const authService = new AuthService()