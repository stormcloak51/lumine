import { Container } from '@mantine/core'
import { ReactNode } from 'react'

import { SettingsSidenav } from './ui/settings-sidenav'

export default function SettingsLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <Container
      px={5}
      py={12}
      className={`flex flex-row !bg-[#1f2124] rounded-lg border border-[rgba(126,126,126,0.15)]`}
    >
      <SettingsSidenav />
      <div className="w-full overflow-y-auto">{children}</div>
    </Container>
  )
}
