import { Header } from '@/widgets/header'
import { SideNav } from '@/widgets/sidenav'

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section className='max-w-[1224px] mx-auto'>
			<Header />
			<main className={`pt-[120px]`}>
				<SideNav />
				<div className='pl-[290px]'>{children}</div>
			</main>
		</section>
	)
}