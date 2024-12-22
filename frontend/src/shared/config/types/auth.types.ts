

export type TLogin = {
	usernameOrEmail: string
	password: string
}

export type TRegister = {
	name: string
	surname: string
	username: string
	email: string
	password: string
	userAvatar?: string
}

export interface RegisterFormData {
	name: string
	surname: string
	username: string
	email: string
	password: string
	avatar: File | null
	agreeToTerms: boolean
}

export interface LoginFormData {
	usernameOrEmail: string
	password: string
}