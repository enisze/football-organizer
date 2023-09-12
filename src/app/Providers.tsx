'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { TrpcProvider } from '../server/trpc/TrpcProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TrpcProvider>
      <SessionProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </SessionProvider>
    </TrpcProvider>
  )
}

export default Providers
