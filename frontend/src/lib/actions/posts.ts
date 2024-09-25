export async function getAllPosts() {
	try {
		const data = await fetch('localhost:1488/api/posts')
		return data.json()
	} catch(err) {
		console.log(err)
		throw new Error('Failed to get posts')
	} 
}

export function createPost(data: {content: string}) {
	try {
		fetch('localhost:1488/api/posts/create', {
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
