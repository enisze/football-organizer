'use client'

import { Button } from '@/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardLink = () => {
  const pathname = usePathname()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  return (
    <>
      <div>{!onDashboard}</div>
      {!onDashboard && (
        <Link href="/group">
          <Button variant="outline">Dashboard</Button>
        </Link>
      )}
    </>
  )
}
