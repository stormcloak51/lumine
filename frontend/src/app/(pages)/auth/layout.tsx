import type { Metadata } from 'next'

import '@mantine/core/styles.css'

export const metadata: Metadata = {
	title: 'Auth - lumine',
	description: 'Lumine network',
}

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section
			className='w-[100%] h-[100vh] flex justify-center items-center'
			style={{
				backgroundImage: 'radial-gradient(circle , rgba(245, 195, 86, 0.9), rgba(20, 20, 20, 0.3))',
			}}>
			{children}
		</section>
	)
}
