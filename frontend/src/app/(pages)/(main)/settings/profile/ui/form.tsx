'use client'

import { TEditProfile } from '@/shared/config/types/user.types'
import { useAuth } from '@/shared/stores/user/useAuth'
import {
  Button,
  Divider,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useEffect } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md'

import { useEditMutation } from '../model/useEditMutation'
import { useEditSchema } from '../model/useEditSchema'
import { Field, ROLES } from './field'
import { ProfileAvatar } from './profile-avatar'
import { ProfileBackground } from './profile-background'

export const ProfileForm = () => {
  const { user } = useAuth()
  const { form } = useEditSchema()
  const theme = useMantineTheme()
  const { mutate, errors } = useEditMutation()

  const onSubmit = (data: Partial<TEditProfile>) => {
    mutate(data)
  }

  useEffect(() => {
    if (errors) {
      const fieldValue = errors?.message.split('`')[1]
      form.setFieldError(fieldValue, errors?.message)
    }
  }, [errors, form])

  return (
    <div>
      <Flex className="w-full relative" direction={'column'}>
        <ProfileBackground imageUrl={user.userCover} />
        <div className="relative">
          <div className="flex items-center justify-between pl-[150px]">
            <div className="flex gap-y-1 flex-col ">
              <Title className="inter-700 tracking-wide">
                {user?.name} {user?.surname}
              </Title>
              <Text c="dimmed" className="w-min inter-400 tracking-wide">
                @{user?.username}
              </Text>
            </div>
          </div>
        </div>
        <ProfileAvatar />
      </Flex>
      <Divider mt={20} mb={10} size={0.5} color={'rgb(66,66,66)'} w={'100%'} />
      <form
        className={`flex flex-col gap-y-4 w-full px-4`}
        onSubmit={form.onSubmit(onSubmit)}
      >
        <Field
          role={ROLES.TEXTAREA}
          label="Bio"
          placeholder={
            'Designer from Saint Petersburg, love coffee and open typography.'
          }
          cl="w-full"
          key={form.key('bio')}
          {...form.getInputProps('bio')}
        />
        <div className="flex flex-row items-center gap-x-8">
          <Field
            cl="w-[175px]"
            label="Name"
            placeholder={user?.name}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Field
            cl="w-[175px]"
            label="Surname"
            placeholder={user?.surname}
            key={form.key('surname')}
            {...form.getInputProps('surname')}
          />
        </div>
        <Field
          label="Username"
          placeholder={user?.username}
          LeftSectionIcon={MdOutlineAlternateEmail}
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        {/* <Field
					label='Email'
					placeholder={user?.email}
					key={form.key('email')}
					{...form.getInputProps('email')}
				/> */}
        <Button
          type="submit"
          color={theme.colors.myColor[6]}
          className="rounded-lg mt-5 w-[200px] ml-auto transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110 active:scale-95"
        >
          Save changes
        </Button>
      </form>
    </div>
  )
}
