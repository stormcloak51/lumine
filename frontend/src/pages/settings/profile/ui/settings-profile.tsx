import { Divider, Title } from '@mantine/core'
import { ProfileForm } from './form'
export const SettingsProfile = () => {
	return (
		<div className='w-full'>
			<Title className='pl-4 mb-2'>My Profile</Title>
			<Divider size={0.5} color={'rgb(66,66,66)'} w={'100%'} />
			<ProfileForm />
		</div>
	)
}
