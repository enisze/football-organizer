'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { TrpcProvider } from '../server/trpc/TrpcProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <TrpcProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </TrpcProvider>
    </SessionProvider>
  )
}

export default Providers
