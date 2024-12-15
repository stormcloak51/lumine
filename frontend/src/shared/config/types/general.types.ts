

export interface TPaginatedResponse<T> {
	data: T[]
	total: number
	nextPage?: number
}

export interface IAsset {
	key: string  | null
	url: string
}