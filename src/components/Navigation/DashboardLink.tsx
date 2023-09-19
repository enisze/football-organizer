import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Button } from '@/ui/button'
import { headers } from 'next/headers'
import Link from 'next/link'

export const DashboardLink = async () => {
  const pathname = headers().get('x-pathname')

  const session = await getServerComponentAuthSession()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  return (
    <>
      {!onDashboard && session?.user?.id && (
        <Link href="/group">
          <Button variant="outline">Dashboard</Button>
        </Link>
      )}
    </>
  )
}
