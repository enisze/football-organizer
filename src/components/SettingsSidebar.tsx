'use client'
import { cn } from '@/lib/utils/cn'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Separator } from '@/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FunctionComponent } from 'react'
import { NotificationBubble } from './NotificationBubble'

export const SettingsSidebar = () => {
  const { data: session } = useSession()

  const hasPaypalName = Boolean(session?.user?.paypalName)

  return (
    <div className="m-2">
      <OrganizerLink href={'/settings/user'} className={''}>
        <div className="relative flex">
          <span>Accounteinstellungen </span>

          {!hasPaypalName && <NotificationBubble className="!-right-3" />}
        </div>
      </OrganizerLink>
      <OrganizerLink href={'/settings/groups'} className={''}>
        Gruppeneinstellungen
      </OrganizerLink>
    </div>
  )
}

export const SpecificSettings: FunctionComponent = () => {
  const pathname = usePathname()

  const isInSettings =
    pathname?.includes('/settings/user') ||
    pathname?.includes('/settings/groups')

  return (
    <>
      <div className={cn('hidden', isInSettings && 'md:hidden flex flex-col')}>
        <Link href="/settings" className="flex gap-x-2 items-center p-5">
          <ArrowLeft />
          <h5 className="text-xl">Einstellungen</h5>
        </Link>
        <Separator />
      </div>

      <div className={cn('flex', isInSettings && 'hidden md:flex md:flex-col')}>
        <SettingsSidebar />
      </div>
    </>
  )
}
