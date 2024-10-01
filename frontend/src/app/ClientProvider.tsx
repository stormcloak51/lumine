'use client'

import { store } from '@/lib/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	)
}
