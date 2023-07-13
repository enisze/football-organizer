import { NewGroup } from '@/src/components/Groups/NewGroup'
import { SpecificSettings } from '@/src/components/SettingsSidebar'
import { trpc } from '@/src/utils/trpc'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Container } from '@/ui/container'
import { Separator } from '@/ui/separator'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

import Navbar from '../../../components/Navigation/Navbar'

const GroupSettings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const { data: groups } = trpc.group.getGroupsOfUser.useQuery({
    owned: true,
  })

  const { data: link } = trpc.gmail.generateAuthLink.useQuery(undefined, {
    enabled: groups && groups?.length > 0,
  })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  const showNewGroup = (groups?.length ?? 0) < 1 || data.user?.role === 'admin'

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
        <SpecificSettings />
        <Separator orientation="vertical" />
        <div className="flex flex-col p-2">
          {(groups?.length ?? 0) > 0 && (
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
          )}

          <div className="p-4">
            {link && <Link href={link}>Neues gmail token</Link>}
          </div>
          <Separator />
          {/*TODO: Proper management Limited to one group per user currently */}
          {showNewGroup ? (
            <NewGroup />
          ) : (
            groups?.length === 0 && (
              <div className="justify-center flex">Du hast keine Gruppen</div>
            )
          )}
        </div>
      </div>
      <Separator />
    </>
  )
}

export default GroupSettings
