

export interface TPaginatedResponse<T> {
	data: T[]
	total: number
	nextPage?: number
}