import { FetchClient } from '../utils/fetch/fetch.client'

const client = new FetchClient({
	baseUrl: process.env.NEXT_PUBLIC_SERVER_URL as string + '/api',
	options: {
		credentials: 'include',
	}
})

export const api = {
	get: <T>(endpoint: string, options = {}) => {
		return client.get<T>(endpoint, options)
	},
	post: <T>(endpoint: string, body: any, options = {}) => {
		return client.post<T>(endpoint, body, options)
	},
	put: <T>(endpoint: string, body: any, options = {}) => {
		return client.put<T>(endpoint, body, options)
	},
	patch: <T extends Partial<unknown>>(endpoint: string, body: any, options = {}) => {
    return client.patch<T>(endpoint, body, options);
},
	delete: <T>(endpoint: string, body: any, options = {}) => {
		return client.delete<T>(endpoint, body, options)
	},
}