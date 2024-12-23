'use client'
import Image from 'next/image'
import wallpaperImage from '@/public/assets/wallpapers/authPreview1.jpg'
import { useRegisterSchema } from '../model/useRegisterSchema'
import { Text, TextInput, PasswordInput, Button, Switch, Title } from '@mantine/core'
import Link from 'next/link'
import { useRegisterMutation } from '../model/useRegisterMutation'
import { RegisterFormData } from '@/shared/config/types/auth.types'
import { UploadImage } from './upload-image'
import { LumineLogotype } from '@/shared/ui/LumineLogotype'

export const RegisterPage = () => {
	const { form } = useRegisterSchema()
	const { mutate, isPending } = useRegisterMutation()

	const onSubmit = async (data: RegisterFormData) => {
		mutate(data)
	}

	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-[#1f2124]'>
			<div className='relative hidden md:block w-2/3 h-screen'>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1f2124]/80 to-transparent z-10' />
				<Image
					src={wallpaperImage}
					alt='Login wallpaper'
					className='object-cover'
					fill
					sizes='(max-width: 768px) 0vw, 66vw'
					priority
					quality={100}
				/>
				<div className='absolute bottom-0 left-0 p-12 z-20 text-white'>
					<h1 className='text-4xl font-bold mb-4'>Welcome to <span className='text-[#ffd37d]'>lumine</span></h1>
					<p className='text-lg text-gray-200'>
						Sign up to continue your journey
					</p>
				</div>
			</div>

			<form
				className='w-full md:w-[390px] min-h-screen md:min-h-0 flex flex-col bg-[#1f2124] p-8 z-30 h-[100vh] border-l-[rgba(255,255,255,0.2)] border-l'
				onSubmit={form.onSubmit(onSubmit)}
			>
				<LumineLogotype cl='mb-5' />
				<Title className='mb-8'>Sign Up</Title>
				<div className='mb-3 flex gap-x-4 justify-center'>
					<TextInput
						key={form.key('name')}
						{...form.getInputProps('name')}
						label='Your name'
						name='name'
						type='text'
						className='h-[82px]'
					/>
					<TextInput
						key={form.key('surname')}
						{...form.getInputProps('surname')}
						label='Your surname'
						type='text'
						className='h-[82px]'
					/>
				</div>
				<div className='flex gap-y-2 flex-col'>
					<TextInput
						key={form.key('username')}
						{...form.getInputProps('username')}
						label='Username (id)'
						type='text'
						className='min-h-[82px]'
					/>
					<TextInput
						label='Email'
						type='text'
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
							className='h-[82px]'
						/>
					</div>
					<div>
						<UploadImage
							{...form.getInputProps('avatar')}
							onChange={file => form.setFieldValue('avatar', file)}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-y-4 justify-between'>
					<Switch
						color='#ffd37d'
						label='I agree to sell my privacy'
						key={form.key('agreeToTerms')}
						{...form.getInputProps('agreeToTerms')}
					/>
					<Text fz={14} c={'blue'} className='underline underline-offset-2'>
						<Link href={'/login'}>Already have an account?</Link>
					</Text>
				</div>
				<Button
					variant='outline'
					color='#ffd37d'
					type='submit'
					loading={isPending}
					disabled={isPending}
					className='mt-4 w-full'
				>
					Create account
				</Button>
			</form>
		</div>
	)
}
