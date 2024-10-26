import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { getAccessTokenServer } from '@/lib/actions/state'

export enum ETokens {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export const getAccessToken = () => {
	const access_token = getAccessTokenServer()
	console.log(access_token, 'access_tokenasd')
	return access_token

}

export const saveToStorage = (accessToken: string) => {
	setCookie(ETokens.ACCESS_TOKEN, accessToken, {
			sameSite: 'lax',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
	});
	console.log('Cookie установлен:', getCookies());
}

export const removeFromStorage = () => {
	deleteCookie(ETokens.ACCESS_TOKEN)
}
