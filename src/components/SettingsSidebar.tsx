import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { Separator } from '@/ui/base/Separator'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { NotificationBubble } from './NotificationBubble'

export const SettingsSidebar: FunctionComponent = () => {
  const { data: userData } = useSession()

  const hasPaypalName = Boolean(userData?.user?.paypalName)

  return (
    <div className="m-2">
      <OrganizerLink href={'/settings/user'} className={''}>
        <div className="relative flex">
          <span>Accounteinstellungen </span>

          {!hasPaypalName && (
            <NotificationBubble position="topRight" className="-right-3" />
          )}
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
        <SettingsSidebar />
      </div>
    </>
  )
}
