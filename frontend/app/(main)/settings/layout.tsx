import { SettingsSidenav } from '@/pages/settings'
import { inter } from '@/shared/assets/fonts/fonts'
import { Container } from '@mantine/core'

export default function SettingsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Container
			px={5}
			py={12}
			className={`flex flex-row !bg-[#1f2124] rounded-lg border border-[rgba(126,126,126,0.15)] ${inter.className}`}
		>
			<SettingsSidenav />
			<div className='w-full max-h-[600px] overflow-y-auto'>{children}</div>
		</Container>
	)
}
