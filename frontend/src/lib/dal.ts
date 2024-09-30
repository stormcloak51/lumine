import { cache } from 'react'
import 'server-only'

export const verifyUser = cache(async () => {
	return false
})