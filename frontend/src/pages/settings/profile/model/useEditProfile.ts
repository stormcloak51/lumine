import { useForm } from '@mantine/form'


export const useEditProfile = () => {
	
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			bio: '',
			name: '',
			surname: '',
			username: '',
			email: '',
		},
		validate: {
			name: value => (value.length < 2 ? 'Name must be at least 2 characters long' : null),
			surname: value => (value.length < 3 ? 'Surname must be at least 3 characters long' : null),
			username: value => (value.length < 3 ? 'Username must be at least 3 characters long' : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	})


	return {
		form
	}
}	