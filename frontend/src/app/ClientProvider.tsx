'use client'

import { persistor, store } from '@/lib/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
