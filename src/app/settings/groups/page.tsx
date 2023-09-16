'use client'
import { NewGroup } from '@/src/components/Groups/NewGroup'
import { useIsAdmin } from '@/src/hooks/useIsAdmin'
import { api } from '@/src/server/trpc/api'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Container } from '@/ui/container'
import { Separator } from '@/ui/separator'
import { useSession } from 'next-auth/react'

const GroupSettings = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const isAdmin = useIsAdmin()

  const { data: groups } = api.group.getGroupsOfUser.useQuery({ owned: true })
  const { data: link } = api.gmail.generateAuthLink.useQuery(undefined, {
    enabled: groups && groups?.length > 0,
  })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    // notFound()
  }

  const showNewGroup = (groups?.length ?? 0) < 1 || isAdmin

  return (
    <>
      <Separator orientation="vertical" />
      <div className="flex flex-col p-2">
        {(groups?.length ?? 0) > 0 && (
          <div className="flex flex-1 gap-x-3">
            {groups?.map((group) => {
              //FIXME:
              // const url = new URL(`settings/groups/${group.id}`)
              return (
                <Container key={group.id} className="flex flex-col">
                  <span>{`Name: ${group.name}`}</span>
                  <span>{`Erstellungsdatum: ${group.createdAt}`}</span>
                  <span>{`Users: ${group.users.length}`}</span>
                  <span>{`Events: ${group.events.length}`}</span>
                  <span>{`Pricing: ${group.pricingModel}`}</span>

                  <OrganizerLink
                    href={`/settings/groups/${group.id}` as never}
                    className=" flex w-full rounded-md border border-slate-300 bg-transparent mt-3 text-sm dark:border-slate-700 dark:text-slate-50"
                  >
                    Bearbeiten
                  </OrganizerLink>
                </Container>
              )
            })}
          </div>
        )}

        <div className="p-4">
          {link && <a href={link}>Neues gmail token</a>}
        </div>
        {/*TODO: Proper management Limited to one group per user currently */}
        {showNewGroup ? (
          <>
            <Separator />
            <NewGroup />
          </>
        ) : (
          groups?.length === 0 && (
            <div className="justify-center flex">Du hast keine Gruppen</div>
          )
        )}
      </div>
    </>
  )
}

export default GroupSettings
