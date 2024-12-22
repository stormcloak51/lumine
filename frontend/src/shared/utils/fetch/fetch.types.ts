export type TSearchParams = {
	[key: string]:
		| string
		| number
		| boolean
		| undefined
		| Array<string | number | boolean | undefined>
}

export interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
	params?: TSearchParams
}

export type TFetchRequestConfig<Params = undefined> = Params extends undefined ? {confif?: RequestOptions} : {confif?: RequestOptions, params: Params}
