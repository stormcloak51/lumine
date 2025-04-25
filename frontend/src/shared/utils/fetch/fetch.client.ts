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
          value.forEach((currVal) => {
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

  // Активируем обработчик 401 ошибок только для не-auth эндпоинтов
  private shouldHandleUnauthorized(endpoint: string): boolean {
    // Исключаем эндпоинты аутентификации из обработки 401 ошибок
    const authEndpoints = ['auth/login', 'auth/register']
    return !authEndpoints.some((authPath) => endpoint.includes(authPath))
  }

  private handleUnauthorized() {
    // First, log out the user on the server side
    this.post('auth/logout').finally(() => {
      console.log('Logged out due to unauthorized status')

      // Перенаправляем на страницу логина
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/login')
      ) {
        window.location.href = '/login'
      }
    })
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

    try {
      const response: Response = await fetch(url, config)

      if (!response.ok) {
        const error = (await response.json()) as { message: string } | undefined

        // Handle 401 Unauthorized error
        console.log(error, 'error handled')
        if (
          response.status === 401 &&
          this.shouldHandleUnauthorized(endpoint)
        ) {
          this.handleUnauthorized()
          return null as unknown as T // Return early to prevent further processing
        }

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
    } catch (error) {
      if (
        error instanceof FetchError &&
        error.statusCode === 401 &&
        this.shouldHandleUnauthorized(endpoint)
      ) {
        this.handleUnauthorized()
        return null as unknown as T
      }
      throw error
    }
  }

  // Rest of the methods remain the same...
  public get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}) {
    return this.request<T>(endpoint, 'GET', options)
  }

  public post<T>(endpoint: string, body?: any, options: RequestOptions = {}) {
    return this.request<T>(endpoint, 'POST', {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...(!!body && { body: JSON.stringify(body) }),
    })
  }

  public put<T>(endpoint: string, body: any, options: RequestOptions = {}) {
    return this.request<T>(endpoint, 'PUT', {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...(!!body && { body: JSON.stringify(body) }),
    })
  }

  public delete<T>(
    endpoint: string,
    body?: T,
    options?: Omit<RequestOptions, 'body'>
  ) {
    return this.request<T>(endpoint, 'DELETE', {
      ...options,
      ...(!!body && { body: JSON.stringify(body) }),
    })
  }

  public patch<T>(endpoint: string, body: any, options: RequestOptions = {}) {
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
