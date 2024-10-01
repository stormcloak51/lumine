'use client'
import { Button, FileInput, PasswordInput, Switch, TextInput, Title, Text } from '@mantine/core'
import input from '../../components/styles/Header.module.scss'
import { Paperclip } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadAvatar } from '@/lib/actions/uploadAvatar'
import { signUp } from '@/lib/actions/api'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/lib/store/slices/user.slice'


const schema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters long'),
	surname: z.string().min(3, 'Surname must be at least 3 characters long'),
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(20, 'Username must be at most 20 characters long')
		.regex(/^[a-zA-Z0-9]+$/, 'Username must only contain letters and numbers'),
	email: z.string().email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	avatar: z.instanceof(File).optional().or(z.literal(null)),
	agreeToTerms: z.boolean().refine(val => val, 'You must agree to the terms'),
})

type FormData = z.infer<typeof schema>

export const AuthForm = () => {
	const dispatch = useDispatch()

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { avatar, agreeToTerms, ...rest } = data
			try {
				const userAvatar = await uploadAvatar(data.avatar as File, data.username)
				const user = await signUp({ userAvatar, ...rest })
				return user
			} catch (err) {
				console.log(err)
				return null
			}
		},
	})

	const submitRef = useRef<HTMLButtonElement>(null)

	const {
		control,
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
		if (mutation.isSuccess === true && mutation.data !== null) {
			dispatch(setUser(mutation.data))
			redirect('/feed')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutation.isSuccess, mutation.data])

	return (
		<form className='flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
			<Title>Create An Account</Title>
			<div className='mt-5 flex gap-x-4'>
				<TextInput
					{...register('name')}
					label='Your name'
					name='name'
					type='text'
					classNames={input}
					className='min-w-[215px] h-[82px]'
					error={errors.name?.message}
				/>
				<TextInput
					label='Your surname'
					type='text'
					{...register('surname')}
					classNames={input}
					className='min-w-[215px] h-[82px]'
					error={errors.surname?.message}
				/>
			</div>
			<div className='flex gap-y-2 flex-col'>
				<TextInput
					label='Username (id)'
					type='text'
					{...register('username')}
					classNames={input}
					className='min-h-[82px]'
					error={errors.username?.message}
				/>
				<TextInput
					label='Email'
					type='text'
					classNames={input}
					className='h-[82px]'
					{...register('email')}
					error={errors.email?.message}
				/>
				<div>
					<PasswordInput
						size='sm'
						{...register('password')}
						label='Password'
						description='ill know your password :)'
						placeholder='Input placeholder'
						classNames={input}
						className='h-[82px]'
						error={errors.password?.message}
					/>
				</div>
				<div>
					<Controller
						name='avatar'
						control={control}
						render={({ field }) => (
							<FileInput
								leftSection={<Paperclip size={16} />}
								label='Attach your avatar'
								accept='image/png,image/jpeg'
								placeholder='Your avatar'
								leftSectionPointerEvents='none'
								classNames={input}
								className='h-[82px]'
								error={errors.avatar?.message}
								{...field}
							/>
						)}
					/>
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				<Switch
					{...register('agreeToTerms')}
					color='#ffd37d'
					label='I agree to sell my privacy'
					required
					error={errors.agreeToTerms?.message}
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
