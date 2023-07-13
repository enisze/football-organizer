import '../../styles/globals.css'
import { Navbar } from '../components/Navigation/Navbar'
import Providers from './Providers'

export const metadata = {
  title: {
    template: '%s | Next.js 13 App Router Playground',
    default: 'Next.js 13 App Router Playground',
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
      <body className="h-full dark:bg-slate-900 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
