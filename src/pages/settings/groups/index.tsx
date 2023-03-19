import { NewGroup } from '@/src/components/Groups/NewGroup'
import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import { trpc } from '@/src/utils/trpc'
import { Container } from '@/ui/base/Container'
import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { Separator } from '@/ui/base/Separator'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'

import Navbar from '../../../components/Navigation/Navbar'

const GroupSettings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const { data: groups, isLoading } = trpc.group.getGroupsOfUser.useQuery({
    owned: true,
  })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[220px_8px_auto]">
        <SettingsSidebar />

        <Separator orientation="vertical" />
        <div className="flex flex-col p-2">
          <div className="flex flex-1 gap-x-3">
            {groups?.map((group) => (
              <Container key={group.id} className="flex flex-col">
                <span>{`Name: ${group.name}`}</span>
                <span>{`Erstellungsdatum: ${group.createdAt}`}</span>
                <span>{`Users: ${group.users.length}`}</span>
                <span>{`Events: ${group.events.length}`}</span>
                <span>{`Pricing: ${group.pricingModel}`}</span>
                <OrganizerLink
                  href={`/settings/groups/${group.id}`}
                  className=" flex w-full rounded-md border border-slate-300 bg-transparent mt-3 text-sm dark:border-slate-700 dark:text-slate-50"
                >
                  Bearbeiten
                </OrganizerLink>
              </Container>
            ))}
          </div>
          {/*TODO: Proper management Limited to one group per user currently */}
          {groups?.length && groups?.length < 0 && <NewGroup />}
        </div>
      </div>
      <Separator />
    </>
  )
}

export default GroupSettings
