// ----------------------------USERS---------------------------------------


export type TUser = {
	name: string
	surname: string
	username: string
	email: string
	password?: string
	userAvatar: string | undefined
	bio?: string
	role?: string
	access_token?: string
}

// export type TUserProfile = {
// 	name: string
// 	surname: string
// 	username: string
// 	email: string
// 	userAvatar: string | undefined
// 	bio: string
// 	role: string
// }

export type TUserLogin = {
	usernameOrEmail: string
	password: string
}


export interface IUserCredentials {
	id: string
	name: string
	surname: string
	username: string
	email: string
	password: string
	userAvatar: string
	bio: string
	role: string
	created_at: Date | string
}

export type TUserData = {
	access_token?: string
	user: IUserCredentials
}

// ----------------------------POSTS---------------------------------------

export interface IPostData {
	content: string
	User: TUser
}

export type TPost = {
	id: number
	content: string
	created_at: string
	updated_at: string
}

