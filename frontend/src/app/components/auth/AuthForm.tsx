'use client'
import { Button, PasswordInput, Switch, TextInput, Title, Text } from '@mantine/core'
import input from '../../components/styles/Header.module.scss'
import { useEffect, useRef } from 'react'
import { z } from 'zod'
// import { useForm, Controller } from 'react-hook-form'
import { uploadAvatar } from '@/lib/actions/uploadAvatar'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setUser } from '@/lib/store/slices/user.slice'
import { UploadImage } from './UploadImage'
import { useForm } from '@mantine/form'

const schema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters long')
		.regex(/^[a-zA-Zа-яА-Я]+$/, 'Name can only contain Latin or Russian letters'),
	surname: z
		.string()
		.min(3, 'Surname must be at least 3 characters long')
		.regex(/^[a-zA-Zа-яА-Я]+$/, 'Surname can only contain Latin or Russian letters'),
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(20, 'Username must be at most 20 characters long')
		.regex(/^[a-zA-Z0-9]+$/, 'Username must only contain letters and numbers'),
	email: z.string().email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	avatar: z.instanceof(File).optional().or(z.literal(null)),
	agreeToTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
})

type FormData = z.infer<typeof schema>

export const AuthForm = () => {
	const dispatch = useDispatch()

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { avatar, agreeToTerms, ...rest } = data
			try {
				const userAvatar: string = await uploadAvatar(data.avatar as File, data.username)
				const user = await authService.main('register', { userAvatar, ...rest })
				return user
			} catch (err) {
				console.log(err)
				return null
			}
		},
	})

	const submitRef = useRef<HTMLButtonElement>(null)

	// const {
	// 	control,
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = <FormData>({
	// 	resolver: zodResolver(schema),
	// 	mode: 'onChange',
	// 	reValidateMode: 'onChange',
	// })

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			surname: '',
			username: '',
			email: '',
			password: '',
			avatar: null as File | null,
			agreeToTerms: false,
		},

		validate: {
			name: value => (value.length < 2 ? 'Name must be at least 2 characters long' : null),
			surname: value => (value.length < 3 ? 'Surname must be at least 3 characters long' : null),
			username: value => (value.length < 3 ? 'Username must be at least 3 characters long' : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: value => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
			avatar: value => (!value ? 'Avatar is required' : null),
			agreeToTerms: value => (!value && 'You must agree to the terms'),
		},
	})

	// const onSubmit = async (data: FormData) => {
	// 	console.log('Form submitted', data);
	// 	mutation.mutate(data)
	// }

	// useEffect(() => {
	// 	console.log('Form errors:', errors);
	// }, [errors]);
	useEffect(() => {
		if (mutation.isSuccess === true && mutation.data !== null) {
			dispatch(setUser(mutation.data))
			window.location.href = '/feed'
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutation.isSuccess, mutation.data])
	return (
		<form
			onSubmit={form.onSubmit(values => console.log(values))}
			className='flex flex-col justify-between'>
			<Title>Create An Account</Title>
			<div className='mt-5 flex gap-x-4'>
				<TextInput
					key={form.key('name')}
					{...form.getInputProps('name')}
					label='Your name'
					name='name'
					type='text'
					classNames={input}
					className='min-w-[215px] h-[82px]'
				/>
				<TextInput
					key={form.key('surname')}
					{...form.getInputProps('surname')}
					label='Your surname'
					type='text'
					classNames={input}
					className='min-w-[215px] h-[82px]'
				/>
			</div>
			<div className='flex gap-y-2 flex-col'>
				<TextInput
					key={form.key('username')}
					{...form.getInputProps('username')}
					label='Username (id)'
					type='text'
					classNames={input}
					className='min-h-[82px]'
				/>
				<TextInput
					label='Email'
					type='text'
					classNames={input}
					className='h-[82px]'
					key={form.key('email')}
					{...form.getInputProps('email')}
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
						className='h-[82px]'
					/>
				</div>
				<div>
					<UploadImage
						{...form.getInputProps('avatar')}
						onChange={(file) => form.setFieldValue('avatar', file)}
						key={form.key('avatar')}
						classNames={input}
					/>
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				<Switch
					color='#ffd37d'
					label='I agree to sell my privacy'
					key={form.key('agreeToTerms')}
					{...form.getInputProps('agreeToTerms')}
				/>
				<Text fz={12}>
					<Link href={'/auth/login'}>Already have an account?</Link>
				</Text>
			</div>
			<Button
				ref={submitRef}
				variant='outline'
				color='#ffd37d'
				type='submit'
				loading={mutation.isPending}
				className='mt-4 w-full'>
				Create account
			</Button>
		</form>
	)
}
