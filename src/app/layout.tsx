import Script from 'next/script'
import { Suspense } from 'react'
import '../../styles/globals.css'
import { Navbar } from '../components/Navigation/Navbar'
import { serverAuth } from '../server/auth/session'
import { prisma } from '../server/db/client'
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
	const session = await serverAuth()
	const group = await prisma.group.findFirst({
		where: { users: { some: { id: session?.user?.id } } },
		select: { id: true },
	})
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
						<Navbar group={group} user={session?.user} />
					</Suspense>
					{children}
				</Providers>
			</body>
		</html>
	)
}
