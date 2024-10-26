import Cookies from 'js-cookie';

export enum ETokens {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(ETokens.ACCESS_TOKEN);
	return accessToken || null;
}

export const saveToStorage = (accessToken: string) => {
	Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
		path: '/'
	})
}

export const removeFromStorage = () => {
	Cookies.remove(ETokens.ACCESS_TOKEN, {
		domain: 'localhost',
		path: '/'
	}) 
}