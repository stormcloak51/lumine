import { TPost } from '../types'

export async function getAllPosts() {
	try {
		const data: Promise<TPost[]> = (await fetch('http://localhost:1488/api/posts')).json()
		return data
	} catch(err) {
		console.log(err)
		throw new Error('Failed to get posts')
	} 
}

export function createPost(data: {content: string}) {
	try {
		fetch('http://localhost:1488/api/posts/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	} catch(err) {
		console.log(err)
		throw new Error('Failed to create post')
	}
}
