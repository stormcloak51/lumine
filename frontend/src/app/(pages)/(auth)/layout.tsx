import '@mantine/core/styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shall we begin?',
  description: 'Shrekogram network',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section
      className="w-[100%] min-h-screen flex justify-center items-center"
    >
      {children}
    </section>
  )
}
