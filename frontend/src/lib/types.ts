export type TPost = {
	id: number
	title: string
	content: string
	created_at: string
	updated_at: string
}

export type TUser = {
	name: string
	surname: string
	username: string
	email: string
	password: string
	userAvatar: string | undefined
	access_token?: string
}

export type TUserLogin = {
	usernameOrEmail: string
	password: string
}
