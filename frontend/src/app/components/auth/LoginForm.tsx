'use client'
import { Button, PasswordInput, TextInput, Title, Text } from '@mantine/core'
import input from '../../components/styles/Header.module.scss'
import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { signIn } from '@/lib/actions/api'
import { useDispatch } from 'react-redux'
import { setUser } from '@/lib/store/slices/user.slice'
import { TUserData } from '@/lib/types'


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
				const user = await signIn(data)
				document.cookie = `token=${user.access_token}; path=/;`
				return user
			} catch (err) {
				console.log(err)
				alert(`Something went wrong: ${err}`)
				return null
			}
		},
	})
	const submitRef = useRef<HTMLButtonElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const onSubmit = async (data: FormData) => {
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
				id: data.user.id,
				name: data.user.name,
				surname: data.user.surname,
				username: data.user.username,
				email: data.user.email,
				password: data.user.password,
				userAvatar: data.user.userAvatar,
				bio: data.user.bio,
				role: data.user.role,
				created_at: data.user.created_at
			}
		}))
		window.location.href = '/feed'
	}

	return (
		<form className='flex flex-col justify-between w-[390px]' onSubmit={handleSubmit(onSubmit)}>
			<Title>Log In</Title>
			<div className='flex gap-y-2 flex-col'>
				<TextInput
					{...register('usernameOrEmail')}
					label='Username / Email'
					name='usernameOrEmail'
					type='text'
					classNames={input}
					className='min-w-[215px] h-[82px] mt-5'
					error={errors.usernameOrEmail?.message}
				/>
				<div>
					<PasswordInput
						size='sm'
						{...register('password')}
						label='Password'
						description='ill know your password :)'
						placeholder='Input placeholder'
						classNames={input}
						className='h-[82px] mb-9'
						error={errors.password?.message}
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
