'use client'

import { Navbar } from '@/src/components/Navigation/Navbar'

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      {children}
    </div>
  )
}
