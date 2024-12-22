import { GoBackButton } from '@/shared/ui/GoBackButton'
import { Card, Title } from '@mantine/core'
import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='relative w-full max-w-lg'>
				<div className='absolute -top-10 -left-4 w-72 h-72 bg-purple-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob'></div>
				<div className='absolute -top-10 -right-4 w-72 h-72 bg-yellow-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob animation-delay-2000'></div>
				<div className='absolute top-0 left-20 w-72 h-72 bg-pink-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob animation-delay-4000'></div>
				<Card className='backdrop-blur-md bg-[rgba(0,0,0,0.4)] rounded-xl'>
					<Title order={1}>404 😭</Title>
					<h2 className='text-2xl'>Not Found</h2>
					<p>Could not find requested resource</p>
					<div className='mt-5 flex flex-row gap-x-4 items-center'>
						<GoBackButton radius={'lg'} autoContrast color={'myColor.4'}>
							Go back
						</GoBackButton>
						<Link href={'https://t.me/social_lumine'}>
							<FaTelegram
								className='text-[rgb(39,167,231)] hover:text-[rgba(39,167,231,0.7)] transition-all cursor-pointer'
								size={32}
							/>
						</Link>
					</div>
				</Card>
			</div>
		</div>
	)
}
