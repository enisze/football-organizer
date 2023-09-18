'use client'

import { Button } from '@/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardLink = () => {
  const pathname = usePathname()

  const { status } = useSession()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  return (
    <>
      {!onDashboard && status === 'authenticated' && (
        <Link href="/group">
          <Button variant="outline">Dashboard</Button>
        </Link>
      )}
    </>
  )
}
