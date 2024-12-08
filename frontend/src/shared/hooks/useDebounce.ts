/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react'



export function useDebounce<T extends (...args: any) => void>(callback: T, delay: number) {
	const timerRef = useRef<ReturnType<typeof setTimeout>>()
	
	return useCallback((...args: any[])=> {
		if (timerRef.current) clearTimeout(timerRef.current)
		timerRef.current = setTimeout(() => callback(...args), delay)
	}, [callback, timerRef, delay])

}