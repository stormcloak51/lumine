import Image from 'next/image'
import { Card, Group } from '@mantine/core'
import { LoginForm } from '@/app/components/auth/LoginForm'

const Auth = () => {
	return (
		<Card
			className='mx-auto flex items-center justify-center'
			radius='md'
			style={{
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				backgroundColor: 'rgba(31, 33, 36, 0.75)',
			}}>
			<Group className='flex justify-center'>
				<Image
					className='rounded-lg'
					width={400}
					height={560}
					src='https://img.freepik.com/free-vector/abstract-background_53876-90689.jpg?t=st=1727333013~exp=1727336613~hmac=5b8a3769ac09cea03f5f354f7dfca15bb81122c4584c07ff16aae67102614323&w=900'
					alt='chat'
				/>
				<div className='h-[560px]'>
					<LoginForm />
				</div>
			</Group>
		</Card>
	)
}

export default Auth
