import { getAccessToken, removeFromStorage } from '@/shared/api/authTokenApi'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'
import { authApi } from '@/shared/api/authApi'


const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:1488/api/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(
  async config => {
    const accessToken = await getAccessToken()
    if (config.headers && accessToken) {
      // console.log(123123123)
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

axiosWithAuth.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 || 
        errorCatch(error) === 'jwt expired' || 
        errorCatch(error) === 'jwt must be provided') && 
      originalRequest && 
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        await authApi.getNewTokens()
        const newAccessToken = getAccessToken()

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        return axiosWithAuth(originalRequest)
      } catch (err) {
        removeFromStorage()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)


export {axiosWithAuth, axiosClassic }