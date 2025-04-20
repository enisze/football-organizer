import '../../styles/globals.css'
import { Navbar } from '../components/Navigation/Navbar'
import Providers from './Providers'

export const metadata = {
	title: {
		template: 'Event Wizard',
		default: 'Event Wizard',
	},
	description: 'A simple Event Wizard showing payments based on emails',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="h-full dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
				<meta
					name="google-site-verification"
					content="LMJ7nv6Hz3ij0v5y7cxbJfTE8PAIxT9HFRQ54JMPgN4"
				/>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	)
}
