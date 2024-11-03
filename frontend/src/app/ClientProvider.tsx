'use client'

import { persistor, store } from '@/lib/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				
				<QueryClientProvider client={queryClient}><ReactQueryDevtools initialIsOpen={false} />{children}</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
