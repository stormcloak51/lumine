import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'
import { authService } from '@/services/auth.service'


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
    const accessToken = getAccessToken()
    console.log('accessToken', accessToken);
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
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
        await authService.getNewTokens()
        const newAccessToken = getAccessToken()
        
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        return axiosWithAuth(originalRequest)
      } catch (err) {
        if (errorCatch(err) === 'jwt expired') {
          removeFromStorage()
        }
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)


export {axiosWithAuth, axiosClassic }