import { EUserRoles, IUser } from '../types/user.types'


export const emptyUser: IUser = {
	id: '',
	username: '',
	name: '',
	surname: '',
	userAvatar: '',
	bio: '',
	email: '',
	role: EUserRoles.USER,
	created_at: '',
	updated_at: '',
	userCover: '',
}