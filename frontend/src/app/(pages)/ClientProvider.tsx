'use client'

import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'


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

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={client}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications/>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}
