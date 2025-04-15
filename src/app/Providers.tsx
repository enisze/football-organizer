'use client'

import { Toaster } from '@/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useState, type ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider>
			<ThemeProvider attribute="class">
				<QueryClientProvider client={queryClient}>
					<Toaster />
					<NuqsAdapter>{children}</NuqsAdapter>
				</QueryClientProvider>
			</ThemeProvider>
		</SessionProvider>
	)
}

export default Providers
