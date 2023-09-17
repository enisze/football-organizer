'use client'

import { Button } from '@/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardLink = () => {
  const pathname = usePathname()

  const { data } = useSession()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  return (
    <>
      <div>{!onDashboard}</div>
      {!onDashboard && !!data && (
        <Link href="/group">
          <Button variant="outline">Dashboard</Button>
        </Link>
      )}
    </>
  )
}
