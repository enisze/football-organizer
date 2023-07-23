import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import type { FunctionComponent } from 'react'

import { prisma } from '@/src/server/db/client'
import { getServerSession } from 'next-auth'
import { NextSeo } from 'next-seo'
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const groupId = ctx.query.groupId as string

  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  const groupName = await prisma.group.findFirst({
    where: {
      id: groupId,
      users: {
        some: {
          id: session?.user?.id,
        },
      },
    },
    select: {
      name: true,
    },
  })

  const name = groupName?.name

  if (!name || !session?.user?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      groupName: name,
    },
  }
}

const MainPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ groupName }) => {
  return (
    <div className="flex flex-col pb-2">
      <NextSeo title={`Event Wizard ${groupName ? '- ' + groupName : ''}`} />
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default MainPage
