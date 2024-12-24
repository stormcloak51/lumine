import { Header } from '@/widgets/header'
import { SideNav } from '@/widgets/sidenav'
import { Suspense } from 'react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="max-w-[1224px] mx-auto">
      <Header />
      <main className={`pt-[120px]`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SideNav />
        </Suspense>
        <div className="pl-[290px]">{children}</div>
      </main>
    </section>
  )
}
