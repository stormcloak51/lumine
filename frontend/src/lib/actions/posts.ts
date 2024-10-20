import { IPostData, TPost } from '../types'
import {api} from './api'

// export async function getAllPosts() {
// 	try {
// 		const data: Promise<TPost[]> = (await fetch('http://localhost:1488/api/posts')).json()
// 		return data
// 	} catch(err) {
// 		console.log(err)
// 		throw new Error('Failed to get posts')
// 	} 
// }

export async function createPost(data: IPostData): Promise<TPost | undefined> {
	try {
		const post = await api.post('posts/create', data)
		return post.data
	} catch(err) {
		console.log(err)
	}
}

export const getPostByQuery = async (queryKey: string, token: string): Promise<TPost[] | undefined> => {
	console.log('QUERY', queryKey)
	try {
		const data = await api.get(`posts/findByUsername?username=${queryKey}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return data.data
	} catch(err) {
		console.log(err)
	}

}