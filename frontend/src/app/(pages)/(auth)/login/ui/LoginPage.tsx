'use client'

import wallpaperImage from '@/public/assets/wallpapers/authPreview1.jpg'
import { LoginFormData } from '@/shared/config/types/auth.types'
import { LumineLogotype } from '@/shared/ui/LumineLogotype'
import { Button, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { useLoginMutation } from '../model/useLoginMutation'
import { useLoginSchema } from '../model/useLoginSchema'

export function LoginPage() {
  const submitRef = useRef<HTMLButtonElement>(null)

  const { form } = useLoginSchema()
  const { mutate, isPending } = useLoginMutation()

  const onSubmit = async (data: LoginFormData) => {
    mutate(data)
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1f2124]">
      <div className="relative hidden md:block w-2/3 h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f2124]/80 to-transparent z-10" />
        <Image
          src={wallpaperImage}
          alt="Login wallpaper"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 0vw, 66vw"
          quality={100}
        />
        <div className="absolute bottom-0 left-0 p-12 z-20 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-gray-200">
            Log in to continue your journey
          </p>
        </div>
      </div>

      <form
        className="w-full md:w-[390px] min-h-screen md:min-h-0 flex flex-col bg-[#1f2124] p-8 z-30 h-[100vh] border-l-[rgba(255,255,255,0.2)] border-l"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <LumineLogotype cl="mb-5" />
        <Title className="mb-8">Log In</Title>
        <div className="flex gap-y-4 flex-col">
          <TextInput
            key={form.key('usernameOrEmail')}
            {...form.getInputProps('usernameOrEmail')}
            label="Username / Email"
            name="usernameOrEmail"
            type="text"
            className="min-w-[215px]"
          />
          <PasswordInput
            key={form.key('password')}
            {...form.getInputProps('password')}
            size="sm"
            label="Password"
            description="ill know your password :)"
            placeholder="Input placeholder"
            className="mb-6"
          />
        </div>
        <div className="flex flex-row justify-between mb-6">
          <Text c={'blue'} className="underline underline-offset-2" fz={14}>
            <Link href={'/register'}>{"Haven't signed up yet?"}</Link>
          </Text>
        </div>
        <Button
          ref={submitRef}
          variant="outline"
          color="#ffd37d"
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="w-full"
        >
          Log In
        </Button>
      </form>
    </div>
  )
}
