import Navbar from '@/src/components/Navigation/Navbar'
import { prisma } from '@/src/server/db/client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  const group = await prisma.group.findMany({
    where: { users: { some: { id: session?.user?.id } } },
    select: { id: true },
  })

  const id = group.at(0)?.id

  if (id) {
    return {
      redirect: {
        destination: `/group/${id}`,
      },
    }
  }
  return { props: {} }
}

const MainPage = () => {
  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="flex flex-col justify-center">
        <span>Du bist noch kein Mitglied einer Gruppe</span>

        <OrganizerLink href="/settings/groups" className="justify-center">
          Grupper erstellen
        </OrganizerLink>
      </div>
    </div>
  )
}

export default MainPage
