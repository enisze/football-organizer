import { OrganizerLink } from '@/ui/OrganizerLink'
import { Separator } from '@/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { authOptions } from '../server/auth/authOptions'
import { NotificationBubble } from './NotificationBubble'

export const SettingsSidebar = async () => {
  const session = await getServerSession(authOptions)

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
  return (
    <>
      <div className="md:hidden flex flex-col">
        <Link href="/settings" className="flex gap-x-2 items-center p-5">
          <ArrowLeft />
          <h5 className="text-xl">Einstellungen</h5>
        </Link>
        <Separator />
      </div>

      <div className="hidden md:block">
        {/* @ts-expect-error Server Component */}
        <SettingsSidebar />
      </div>
    </>
  )
}
