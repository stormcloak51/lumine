


import { TUserData } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: TUserData = {
	user: {
		id: '',
		name: '',
		surname: '',
		username: '',
		email: '',
		password: '',
		userAvatar: '',
		bio: '',
		role: '',
		created_at: '' ,
	},
	access_token: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TUserData>) {
			state.access_token = action.payload.access_token
			state.user.id = action.payload.user.id
			state.user.name = action.payload.user.name
			state.user.surname = action.payload.user.surname
			state.user.username = action.payload.user.username
			state.user.email = action.payload.user.email
			state.user.password = action.payload.user.password
			state.user.userAvatar = action.payload.user.userAvatar
			state.user.bio = action.payload.user.bio
			state.user.role = action.payload.user.role
		},
		deleteUser(state) {
			state.user.id = ''
			state.access_token = ''
			state.user.name =  ''
			state.user.surname = ''
			state.user.username = ''
			state.user.email = ''
			state.user.password = ''
			state.user.userAvatar = ''
			state.user.bio = ''
			state.user.role = ''
		}
	}
});

export const {setUser, deleteUser} = userSlice.actions

export default userSlice.reducer