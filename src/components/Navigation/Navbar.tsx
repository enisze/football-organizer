'use client'

import { Button } from '@/ui/button'
import { ThemeToggle } from '@/ui/theme-toggle'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'
import { Heading } from '../Heading'
import { OrganizerMenu } from './OrganizerMenu'

export const Navbar: FunctionComponent = () => {
  const pathname = usePathname()

  const router = useRouter()

  const onDashboard =
    pathname?.includes('/group') && !pathname?.includes('/settings')

  const { data } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <nav className="flex items-center justify-between px-2 py-3">
        <Heading size="sm" />

        <div className="flex gap-x-1 items-center cursor-pointer">
          {/* <Link href={'/pricing'}>Pricing</Link> */}
          <OrganizerMenu />

          {!data?.user && (
            <Button
              variant="outline"
              onClick={() => {
                router.push('/api/auth/signin')
              }}
            >
              Login / Registrieren
            </Button>
          )}

          {!onDashboard && !!data && <Link href="/group">Dashboard</Link>}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
