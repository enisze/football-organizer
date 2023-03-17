import { OrganizerLink } from '@/ui/base/OrganizerLink'
import type { FunctionComponent } from 'react'

export const SettingsSidebar: FunctionComponent = () => {
  return (
    <div className="m-2">
      <OrganizerLink href={'/settings'} className={''}>
        Nutzer
      </OrganizerLink>
      <OrganizerLink href={'/settings/groups'} className={''}>
        Gruppen
      </OrganizerLink>
    </div>
  )
}
