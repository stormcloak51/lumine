import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export enum ETokens {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export const getAccessToken = async () => {
	return await getCookie(ETokens.ACCESS_TOKEN) || null
}

export const saveToStorage = (accessToken: string) => {
	setCookie(ETokens.ACCESS_TOKEN, accessToken)
}

export const removeFromStorage = () => {
	deleteCookie(ETokens.ACCESS_TOKEN)
}
