import { useForm } from '@mantine/form'

export const useLoginSchema = () => {
	const loginForm = useForm({
		mode: 'uncontrolled',
		initialValues: {
			usernameOrEmail: '',
			password: '',
		},

		validate: {
			usernameOrEmail: (value: string) =>
				value.length < 3
					? 'Username/email must be at least 3 characters long'
					: null,
			password: (value: string) =>
				value.length < 6 ? 'Password must be at least 6 characters long' : null,
		},
	})

	return {
		form: loginForm
	}
}
