import '../../styles/globals.css'
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
      <body className="h-full dark:bg-slate-900 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
