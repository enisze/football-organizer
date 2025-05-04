import Script from 'next/script'
import { Suspense } from 'react'
import '../../styles/globals.css'
import { NavbarWrapper } from '../components/Navigation/NavbarWrapper'
import Providers from './Providers'

export const metadata = {
	title: {
		template: 'Event Wizard',
		default: 'Event Wizard',
	},
	description: 'A simple Event Wizard showing payments based on emails',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className='h-full dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased'>
				<meta
					name='google-site-verification'
					content='LMJ7nv6Hz3ij0v5y7cxbJfTE8PAIxT9HFRQ54JMPgN4'
				/>
				<Script
					defer
					src='https://cloud.umami.is/script.js'
					data-website-id='31a75f96-2a90-4c5f-93cc-758db339f2f1'
				/>
				<Providers>
					<Suspense>
						<NavbarWrapper />
					</Suspense>
					{children}
				</Providers>
			</body>
		</html>
	)
}
