'use client'

import LumineBlackMaterialLogo from '@/public/assets/icons/lumine-material-black.png'
import { Box, Group, Input, Text, Title } from '@mantine/core'
import { Search, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import input from './Header.module.scss'
import { UserMenu } from './user-menu'
import { FriendRequests } from '@/features/friendship/FriendRequests'

export function Header() {
  return (
    <Box className="p-3 bg-[rgba(31,33,36,0.7)] rounded-b-2xl border border-[rgb(66,66,66)] border-t-0 fixed max-w-[1224px] w-[100%] z-10 backdrop-blur-md">
      <Group justify="space-between">
        <Group>
          <Image
            src={LumineBlackMaterialLogo}
            alt="Lumine logo"
            height={36}
            width={36}
          />
          <Title className={`tracking-tighter`} size="28">
            <Text
              size="28"
              fw={700}
              className="!leading-8"
              variant="gradient"
              gradient={{ from: '#ffd37d', to: '#ffbb38', deg: 90 }}
            >
              shrekogram
            </Text>
          </Title>
        </Group>
        <Input
          placeholder="Quick search"
          size="md"
          className="w-[200px] text-[14px] outline-[#ffcb64]"
          radius={'lg'}
          leftSection={<Search size={16} />}
          classNames={input}
        />
        <Group className="flex items-center">
          <Link href={'/settings/theme'}>
            <Sun size={24} className="stroke-primary-200" fill="black" />
          </Link>
          <FriendRequests/>
          {' '}
          {/* FRIEND REQUESTS */}
          <UserMenu size={40} />
        </Group>
      </Group>
    </Box>
  )
}
