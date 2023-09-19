import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'

import { prisma } from '@/src/server/db/client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { GroupSelector } from './GroupSelector'

export const GroupSelectorServer = async () => {
  const session = await getServerComponentAuthSession()

  const id = session?.user?.id

  const groups = await prisma.userOnGroups.findMany({
    where: {
      id,
    },
  })

  return (
    <>
      {groups.length > 0 ? (
        <GroupSelector groups={groups} />
      ) : (
        <div className="flex flex-col justify-center">
          <span>Du bist noch kein Mitglied einer Gruppe</span>

          <OrganizerLink href="/settings/groups" className="justify-center">
            Grupper erstellen
          </OrganizerLink>
        </div>
      )}
    </>
  )
}
