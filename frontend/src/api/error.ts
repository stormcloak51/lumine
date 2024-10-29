

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message || error?.message

	return message
}