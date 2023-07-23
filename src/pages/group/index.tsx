import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import { OrganizerLink } from '@/ui/OrganizerLink'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useEffect, useRef } from 'react'
import { prisma } from '../../../prisma/prisma'
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  const group = await prisma.group.findMany({
    where: { users: { some: { id: session?.user?.id } } },
    select: { id: true },
  })

  const id = group.at(0)?.id

  return {
    props: {
      id,
    },
  }
}

const MainPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const isInitialGroupSet = useRef(false)

  const router = useRouter()

  useEffect(() => {
    if (isInitialGroupSet.current) return
    isInitialGroupSet.current = true
    router.push(`/group/${id}`)
  }, [id, router])

  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      {id ? (
        <Dashboard />
      ) : (
        <div className="flex flex-col justify-center">
          <span>Du bist noch kein Mitglied einer Gruppe</span>

          <OrganizerLink href="/settings/groups" className="justify-center">
            Grupper erstellen
          </OrganizerLink>
        </div>
      )}
    </div>
  )
}

export default MainPage
