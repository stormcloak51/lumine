import { TUser } from '../types'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:1488/api/',
})

export const signUp = async (user: TUser) => {
	const data = api.post('auth/signup', user)

	return data
}

// export const signIn = async ()