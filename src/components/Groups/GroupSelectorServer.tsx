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
        <OrganizerLink href="/settings/groups" className="text-sm">
          Gruppe erstellen
        </OrganizerLink>
      )}
    </>
  )
}
