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
		<section>
			{children}
		</section>
	)
}
