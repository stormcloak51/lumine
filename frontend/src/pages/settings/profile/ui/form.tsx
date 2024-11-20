import { useAuth } from '@/shared/lib/useAuth'
import LumineAvatar from '@/shared/ui/LumineAvatar'
import { Button, Divider, Flex, Title, useMantineTheme, Text } from '@mantine/core'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { Field, ROLES } from './field'
import { ProfileBackground } from './profile-background'


export const ProfileForm = () => {
	const { user } = useAuth()
	const theme = useMantineTheme()
	const [isAvatarHovered, setIsAvatarHovered] = useState
	(false)


	return (
		<div>
			<Flex className='w-full relative' direction={'column'}>
				<ProfileBackground imageUrl={user?.userAvatar} />
				<div className='relative'>
					<div className='flex items-center justify-between pl-[150px]'>
						<div className='flex gap-y-1 flex-col '>
							<Title className='inter-700 tracking-wide'>
								{user?.name} {user?.surname}
							</Title>
							<Text c='dimmed' className='w-min inter-400 tracking-wide'>
								@{user?.username}
							</Text>
						</div>
					</div>
				</div>
				<div
					className='absolute top-[130px] left-[10%] transform -translate-x-1/2'
					onMouseEnter={() => setIsAvatarHovered(true)}
					onMouseLeave={() => setIsAvatarHovered(false)}
				>
					<div className='relative'>
						<LumineAvatar
							hasStories={false}
							size={130}
							url={user?.userAvatar}
							username={user?.username}
							shouldRedirect={false}
						/>
						<div
							className={`absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200 ${
								isAvatarHovered ? 'opacity-100' : 'opacity-0'
							}`}
							style={{ background: 'rgba(0, 0, 0, 0.5)' }}
						>
							<Button
								className='bg-transparent hover:bg-black/70 text-white rounded-full p-2'
								onClick={() => {
								}}
							>
								<Camera size={24} />
							</Button>
						</div>
					</div>
				</div>
			</Flex>
			<Divider mt={20} mb={10} size={0.5} color={'rgb(66,66,66)'} w={'100%'} />
			<form className='flex flex-col gap-y-4 w-full px-4'>
				<Field
					role={ROLES.TEXTAREA}
					label='Bio'
					placeholder={
						'Designer from Saint Petersburg, love coffee and open typography.'
					}
					cl='w-full'
				/>
				<div className='flex flex-row items-center gap-x-8'>
					<Field cl='w-[175px]' label='Name' placeholder={user?.name} />
					<Field cl='w-[175px]' label='Surname' placeholder={user?.surname} />
				</div>
				<Field
					label='Username'
					placeholder={user?.username}
					LeftSectionIcon={MdOutlineAlternateEmail}
				/>
				<Field label='Email' placeholder={user?.email} />
				<Button
					type='submit'
					color={theme.colors.myColor[6]}
					className='rounded-lg mt-5 w-[200px] ml-auto transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110 active:scale-95'
				>
					Save changes
				</Button>
			</form>
		</div>
	)
}
