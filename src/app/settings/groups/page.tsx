import { NewGroup } from '@/src/components/Groups/NewGroup'
import { Navbar } from '@/src/components/Navigation/Navbar'
import { authOptions } from '@/src/server/auth/authOptions'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Container } from '@/ui/container'
import { Separator } from '@/ui/separator'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { prisma } from '../../../server/db/client'

const GroupSettings = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const groups = await prisma.group.findMany({
    where: { ownerId: userId },
    select: {
      name: true,
      id: true,
      createdAt: true,
      events: true,
      pricingModel: true,
      users: true,
    },
  })

  // const { data: link } = trpc.gmail.generateAuthLink.useQuery(undefined, {
  //   enabled: groups && groups?.length > 0,
  // })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    notFound()
  }

  const showNewGroup =
    (groups?.length ?? 0) < 1 || session?.user?.role === 'admin'

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
        <Separator orientation="vertical" />
        <div className="flex flex-col p-2">
          {(groups?.length ?? 0) > 0 && (
            <div className="flex flex-1 gap-x-3">
              {groups?.map((group) => {
                const url = new URL(`/settings/groups/${group.id}`)
                return (
                  <Container key={group.id} className="flex flex-col">
                    <span>{`Name: ${group.name}`}</span>
                    <span>{`Erstellungsdatum: ${group.createdAt}`}</span>
                    <span>{`Users: ${group.users.length}`}</span>
                    <span>{`Events: ${group.events.length}`}</span>
                    <span>{`Pricing: ${group.pricingModel}`}</span>

                    <OrganizerLink
                      href={url}
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
            {/* {link && <a href={link}>Neues gmail token</a>} */}
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
