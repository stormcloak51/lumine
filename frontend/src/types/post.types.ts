import { IUserCredentials, TUser } from './user.types'

export interface IPostData {
	content: string
	User: IUserCredentials
}

export type TPost = {
	id: number
	content: string
	created_at: string
	updated_at: string
	User: IUserCredentials
}
