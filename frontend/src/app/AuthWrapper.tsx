
export const AuthWrapper = ({children, token}: {children: React.ReactNode, token: string | undefined}) => {

	if (token) {
		return <>{children}</>
	} else {
		return null
	}
}