import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Button } from '@/ui/button'
import { ThemeToggle } from '@/ui/theme-toggle'
import Link from 'next/link'
import { Heading } from '../Heading'
import { DashboardLink } from './DashboardLink'
import { OrganizerMenu } from './OrganizerMenu'

export const Navbar = async () => {
  const data = await getServerComponentAuthSession()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <nav className="flex items-center justify-between px-2 py-3">
        <Heading size="sm" />

        <div className="flex gap-x-1 items-center cursor-pointer">
          <OrganizerMenu />

          {!data?.user && (
            <Link href="/api/auth/signin">
              <Button variant="outline">Login / Registrieren</Button>
            </Link>
          )}
          <DashboardLink />

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
