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

export const getPostByQuery = async (queryKey: string): Promise<TPost[] | undefined> => {

	try {
		const data = await api.get(`posts?username=${queryKey}`)
		return data.data
	} catch(err) {
		console.log(err)
	}

}