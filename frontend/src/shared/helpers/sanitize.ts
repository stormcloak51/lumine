
export function sanitize<T>(data: T, key: 'post' | 'comment' | 'message'): T {
	
	const sanitizedData = {
		...data,
		data: data.data.map((item: ))
	}
}