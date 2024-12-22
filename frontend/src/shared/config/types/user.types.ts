export type TUser = {
	name: string
	surname: string
	username: string
	email: string
	password?: string
	userAvatar: string | null
	userCover?: string
	bio?: string
	role?: string
	access_token?: string
}

export type TUserProfile = {
	id: string
	name: string
	surname: string
	username: string
	email: string
	userAvatar: string | null
	userCover: string
	bio: string
	role: string
	created_at: Date | string | null
	updated_at: Date | string | null
}

export type TUserLogin = {
	usernameOrEmail: string
	password: string
}


export interface IUser {
	id: string
	name: string
	surname: string
	username: string
	email: string
	password: string
	userAvatar: string
	userCover: string
	bio: string
	role: EUserRoles
	created_at: Date | string | null
	updated_at: Date | string | null
}

export type TUserData = {
	access_token?: string
	user: IUser
}

export enum EUserRoles {
	ADMIN,
	USER,
	OWNER,
} 