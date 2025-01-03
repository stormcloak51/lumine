import { FetchError } from './fetch.error'
import { RequestOptions, TSearchParams } from './fetch.types'

export class FetchClient {
	private baseUrl: string
	public headers?: Record<string, string>
	public params?: TSearchParams
	public options?: RequestOptions

	constructor(init: {
		baseUrl: string
		headers?: Record<string, string>
		params?: TSearchParams
		options?: RequestOptions
	}) {
		this.baseUrl = init.baseUrl
		this.headers = init.headers
		this.params = init.params
		this.options = init.options
	}

	private createSearchParams(params: TSearchParams) {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]
				if (Array.isArray(value)) {
					value.forEach(currVal => {
						if (currVal) {
							searchParams.append(key, String(currVal))
						}
					})
				} else if (value) {
					searchParams.set(key, String(value))
				}
			}
		}
		return `?${searchParams.toString()}`
	}

	async request<T>(
		endpoint: string,
		method: RequestInit['method'],
		options?: RequestOptions
	) {
		let url = `${this.baseUrl}/${endpoint}`

		if (options?.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			...options,
			...(!!this.options && { ...this.options }),
			method,
			headers: {
				...(!!options?.headers && options.headers),
				...this.headers,
			},
		}

		const response: Response = await fetch(url, config)


		if (!response.ok) {
			const error = (await response.json()) as { message: string } | undefined

			throw new FetchError(
				response.status,
				error?.message || response.statusText
			)
		}

		if (response.headers.get('Content-Type')?.includes('application/json')) {
			return (await response.json()) as unknown as T
		} else {
			return (await response.text()) as unknown as T
		}
	}

	public get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}) {
		return this.request<T>(endpoint, 'GET', options)
	}

	public post<T>(
		endpoint: string,
		body?: any,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'POST', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
			...(!!body && { body: JSON.stringify(body) }),
		})
	}

	public put<T>(
		endpoint: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body: any,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PUT', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
			...(!!body && { body: JSON.stringify(body) }),
		})
	}

	public delete<T>(endpoint: string, body: T, options?: Omit<RequestOptions, 'body'>) {
		return this.request<T>(endpoint, 'DELETE', {
			...options,
			...(!!body && { body: JSON.stringify(body) }),
		})
	}

	public patch<T>(
		endpoint: string,
		body: any,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PATCH', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
			...(!!body && { body: JSON.stringify(body) }),
		})
	}
}
