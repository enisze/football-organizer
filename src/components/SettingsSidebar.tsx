import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { Separator } from '@/ui/base/Separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

export const SettingsSidebar: FunctionComponent = () => {
  return (
    <div className="m-2">
      <OrganizerLink href={'/settings/user'} className={''}>
        Account
      </OrganizerLink>
      <OrganizerLink href={'/settings/groups'} className={''}>
        Gruppen
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
