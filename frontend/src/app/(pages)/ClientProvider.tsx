'use client'

import { SocketProvider } from '@/shared/stores/socket/socket.provider'
import { MantineColorsTuple, MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import Cookies from 'js-cookie'



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

  const token = Cookies.get()

  console.log(token)
  return (
    <QueryClientProvider client={client}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <SocketProvider sessionId={'s%3ARhPXltbdawHrja9D8bi1ZyqCrUnHE7xY.D8JfmMqoODJSDOIbRBn6KmPGnRcfHjJQDKtrMJbK0FE'}>
          <Notifications />

          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </SocketProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
