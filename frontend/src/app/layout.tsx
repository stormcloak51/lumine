import { MantineColorsTuple, MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import type { Metadata } from 'next'

import ClientProvider from './(pages)/ClientProvider'
import './(pages)/globals.css'

export const metadata: Metadata = {
  title: 'lumine',
  description: 'Generated by create next app',
}

const myColor: MantineColorsTuple = [
  '#ffd37d',
  '#fff8e1',
  '#ffefcb',
  '#ffdd9a',
  '#ffcb64',
  '#ffbb38',
  '#ffb11b',
  '#ffac09',
  '#e39600',
  '#ca8500',
  '#b07200',
]

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  primaryShade: 3,
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ClientProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
