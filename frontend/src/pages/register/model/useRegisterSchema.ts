import { useForm } from '@mantine/form'

export const useRegisterSchema = () => {
	const registerForm = useForm({
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

	return {
		form: registerForm
	}
}
