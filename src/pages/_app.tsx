import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { Inter as FontSans } from '@next/font/google'
import { trpc } from '../utils/trpc'

import '@/styles/globals.css'
import { Toaster } from '@/ui/base/Toaster'
import { ThemeProvider } from 'next-themes'
import { PromiseQueueContextProvider } from '../contexts/PromiseQueueContext'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }
        #__next {
          height: 100%;
        }
      `}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <PromiseQueueContextProvider>
            <Toaster />
            <Component {...pageProps} />
          </PromiseQueueContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default trpc.withTRPC(MyApp)
