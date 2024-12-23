import { FetchClient } from '../utils/fetch/fetch.client'

export const api = new FetchClient({
	baseUrl: process.env.NEXT_PUBLIC_SERVER_URL as string + '/api',
	options: {
		credentials: 'include',
	}
})