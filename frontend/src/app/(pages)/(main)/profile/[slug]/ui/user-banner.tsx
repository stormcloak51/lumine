'use client'

import { IUser } from '@/shared/config/types/user.types'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Card, Flex, HoverCard, Text, Title, Transition } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import Image from 'next/image'
import { FC, useState } from 'react'

import { ChangeCredentials } from './change-credentials'

export const UserBanner: FC<IUser> = (user) => {
  const clipboard = useClipboard({ timeout: 1000 })
  const [mounted, setMounted] = useState<boolean>(false)
  return (
    <Flex className="w-full relative" direction={'column'}>
      <div className="w-full min-h-[200px] overflow-hidden relative">
        <Image
          src={user.userCover}
          alt="profile background"
          className="object-cover object-center rounded-t-lg"
          fill
        />
      </div>
      <Card className="!bg-[#1f2124] rounded-b-lg border-b border-r border-l border-[rgb(66,66,66)] relative pl-[180px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-x-2 items-center">
              <Title className="inter-700 tracking-wide">
                {user?.name} {user?.surname}
              </Title>
              <DotLottieReact
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/lottie.json"
                autoplay
                className=""
                style={{
                  width: '28px',
                  height: '28px',
                }}
              />
            </div>
            <div className="flex gap-x-2">
              <HoverCard width={280} shadow="md" openDelay={400}>
                <HoverCard.Target>
                  <Text
                    onClick={() => {
                      clipboard.copy(user?.username)
                      setMounted(true)
                      setTimeout(() => setMounted(false), 500)
                    }}
                    c={'dimmed'}
                    className="w-min cursor-pointer font-sans"
                  >
                    @{user?.username}
                  </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown className="!bg-[#1f2124] rounded-xl">
                  <Transition
                    mounted={true}
                    transition="fade-up"
                    duration={400}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <div>
                        {user.bio.split('\n').map((line, index) => (
                          <Text key={index} style={styles}>
                            {line}
                          </Text>
                        ))}
                      </div>
                    )}
                  </Transition>
                </HoverCard.Dropdown>
              </HoverCard>

              <Transition
                mounted={mounted}
                transition="fade-left"
                duration={500}
                timingFunction="ease"
              >
                {(styles) => (
                  <Text
                    c={'green'}
                    style={styles}
                    className="w-min cursor-pointer font-sans"
                  >
                    {clipboard.copied ? 'Copied!' : ''}
                  </Text>
                )}
              </Transition>
            </div>
          </div>
          <ChangeCredentials currId={user.id} />
        </div>
      </Card>
      <LumineAvatar
        position="absolute"
        className="top-[130px] transform -translate-x-1/2 left-[10%]"
        hasStories={true}
        size={130}
        url={user?.userAvatar}
        username={user?.username}
      />
    </Flex>
  )
}
