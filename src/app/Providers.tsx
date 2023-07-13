'use client'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { TrpcProvider } from '../utils/trpc-provider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <TrpcProvider>{children}</TrpcProvider>
    </ThemeProvider>
  )
}

export default Providers
