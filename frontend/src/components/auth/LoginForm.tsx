'use client'
import { Button, PasswordInput, TextInput, Title, Text } from '@mantine/core'
import input from '@/components/styles/Header.module.scss'
import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setUser } from '@/lib/store/slices/user.slice'
import { TUserData } from '@/types/user.types'
import { authService } from '@/services/auth.service'
import { useForm } from '@mantine/form'

const schema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, 'Username/email must be at least 3 characters long')
    .max(20, 'Username/email must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9@.]+$/, 'Username/email must only contain letters, numbers, @, and .'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type FormData = z.infer<typeof schema>
export const LoginForm = () => {
	const dispatch = useDispatch()

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			try {
				const user = await authService.main('login', data)
				return user
			} catch (err) {
				console.log(err)
				return null
			}
		},
	})
	const submitRef = useRef<HTMLButtonElement>(null)

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			usernameOrEmail: '',
			password: '',
		},
		validate: {
      usernameOrEmail: (value) => {
        const result = schema.shape.usernameOrEmail.safeParse(value)
        return result.success ? null : result.error.errors[0].message
      },
      password: (value) => {
        const result = schema.shape.password.safeParse(value)
        return result.success ? null : result.error.errors[0].message
      }
		},
	})

	const onSubmit = async() => {
		const data: FormData = form.getValues()
		mutation.mutate(data)
	}

	useEffect(() => {
		if (mutation.isSuccess && mutation.data) {
			handleLogin(mutation.data)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutation.data, mutation.isSuccess])

	const handleLogin = async (data: TUserData) => {
		await dispatch(setUser({
			access_token: data.access_token,
			user: {
				...data.user
			}
		}))
		window.location.href = '/feed'
	}

	return (
		<form className='flex flex-col justify-between w-[390px]' onSubmit={form.onSubmit(onSubmit)}>
			<Title>Log In</Title>
			<div className='flex gap-y-2 flex-col'>
				<TextInput
					key={form.key('usernameOrEmail')}
					{...form.getInputProps('usernameOrEmail')}
					label='Username / Email'
					name='usernameOrEmail'
					type='text'
					classNames={input}
					className='min-w-[215px] h-[82px] mt-5'
				/>
				<div>
					<PasswordInput
						key={form.key('password')}
						{...form.getInputProps('password')}
						size='sm'
						label='Password'
						description='ill know your password :)'
						placeholder='Input placeholder'
						classNames={input}
						className='h-[82px] mb-9'
					/>
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				<Text fz={12}><Link href={'/auth'}>{"Haven't signed up yet?"}</Link></Text>
			</div>
			<Button
				ref={submitRef}
				variant='outline'
				color='#ffd37d'
				type='submit'
				loading={mutation.isPending}
				className='mt-4 w-full'>
				Log In
			</Button>
		</form>
	)
}
