'use client'
import { Toaster } from '@/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute='class'>
				<Toaster />
				{children}
			</ThemeProvider>
		</SessionProvider>
	)
}

export default Providers
