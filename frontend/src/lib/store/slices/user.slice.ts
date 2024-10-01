


import { TUser } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState: TUser = {
	name: '',
	surname: '',
	username: '',
	email: '',
	password: '',
	userAvatar: '',
	access_token: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TUser>) {
			state.access_token = action.payload.access_token
			state.name = action.payload.name
			state.surname = action.payload.surname
			state.username = action.payload.username
			state.email = action.payload.email
			state.userAvatar = action.payload.userAvatar
		}
	}
});

export const {setUser} = userSlice.actions

export default userSlice.reducer