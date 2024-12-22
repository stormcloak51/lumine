'use client'
import { Button, ButtonProps } from '@mantine/core'
import { useRouter } from 'next/navigation'


type props = ButtonProps



export const GoBackButton = ({children, ...props}: props) => {
	const router = useRouter()

	const handleClick = () => {
		router.back()
	}

  return (
    <Button onClick={handleClick} {...props}>{children}</Button>
  )
}