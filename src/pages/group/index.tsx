import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getServerSession } from 'next-auth'
import type { FunctionComponent } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'

import { prisma } from '../../../prisma/prisma'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const id = session.user.id

  const groupNames = await prisma.group.findMany({
    where: { users: { some: { id } } },
    select: {
      name: true,
    },
  })

  const names = groupNames?.map((group) => group.name)

  return {
    props: {
      groupNames: names,
    },
  }
}

const MainPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ groupNames }) => {
  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard groupNames={groupNames} />
    </div>
  )
}

export default MainPage
