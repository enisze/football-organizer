import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import type { GetServerSidePropsContext } from 'next'
import type { FunctionComponent } from 'react'

import type { Event } from '@/prisma/generated/client'
import type { InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import SuperJSON from 'superjson'
import { prisma } from '../../../prisma/prisma'
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const groupId = context.params?.groupId as string

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const events = await prisma.event.findMany({
    where: { groupId },
    orderBy: { date: 'asc' },
  })

  const id = session.user.id

  const groupNames = await prisma.group.findMany({
    where: { users: { some: { id } } },
    select: {
      name: true,
    },
  })

  const names = groupNames?.map((group) => group.name)

  if (!events) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      events: SuperJSON.serialize(events),
      groupNames: names,
    },
  }
}

const MainPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ events, groupNames }) => {
  const res: Event[] = SuperJSON.deserialize(events)

  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard events={res} groupNames={groupNames} />
    </div>
  )
}

export default MainPage
