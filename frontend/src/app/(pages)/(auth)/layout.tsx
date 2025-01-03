import '@mantine/core/styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shall we begin?',
  description: 'Lumine network',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section
      className="w-[100%] min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          'radial-gradient(circle , rgba(245, 195, 86, 0.9), rgba(20, 20, 20, 0.3))',
      }}
    >
      {children}
    </section>
  )
}
