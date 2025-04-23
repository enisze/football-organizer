'use client'

import { Toaster } from '@/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, Suspense, useState } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ThemeProvider attribute='class'>
			<Suspense>
				<QueryClientProvider client={queryClient}>
					<Toaster />
					<NuqsAdapter>{children}</NuqsAdapter>
				</QueryClientProvider>
			</Suspense>
		</ThemeProvider>
	)
}

export default Providers
