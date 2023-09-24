'use client'
import { Button } from '@/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardLink = ({ groupId }: { groupId: string | undefined }) => {
  const { data } = useSession()

  const pathname = usePathname()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  return (
    <>
      {!onDashboard && data?.user?.id && (
        <form>
          <Link href={groupId ? `/group/${groupId}` : '/group'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        </form>
      )}
    </>
  )
}
