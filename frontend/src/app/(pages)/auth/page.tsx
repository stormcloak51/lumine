import Image from 'next/image'
import AuthLayout from './layout'
import { Card, Container, Group } from '@mantine/core'

const Auth = () => {
	return (
		<AuthLayout>
			<Card className='w-[100%] h-[100vh] flex items-center justify-center'
			style={{
				backgroundImage: 'radial-gradient(circle , rgba(245, 195, 86, 0.7), rgba(20, 20, 20, 0.3))',
			}} shadow='sm'>
				<Group className='flex justify-center'>
					<Image width={500} height={1000} src='https://img.freepik.com/free-vector/abstract-background_53876-90689.jpg?t=st=1727333013~exp=1727336613~hmac=5b8a3769ac09cea03f5f354f7dfca15bb81122c4584c07ff16aae67102614323&w=900' alt='chat'/>
					<Container>

					</Container>
				</Group>
			</Card>
		</AuthLayout>
	)
}

export default Auth
