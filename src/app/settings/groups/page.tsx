import { NewGroup } from '@/src/components/Groups/NewGroup'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { SCOPES, oAuth2Client } from '@/src/server/gmail'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Container } from '@/ui/container'
import { Separator } from '@/ui/separator'

import { prisma } from '@/src/server/db/client'

const GroupSettings = async () => {
  const session = await getServerComponentAuthSession()
  const userId = session?.user?.id

  const isAdmin = session?.user?.role === 'ADMIN'

  const groups = await prisma.group.findMany({
    where: {
      ownerId: userId,
    },
    include: { users: true, events: true },
  })

  const link = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/oauth2callback',
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
          <a href={link}>Neues gmail token</a>
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
