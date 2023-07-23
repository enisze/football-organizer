import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import type { FunctionComponent } from 'react'

import { NextSeo } from 'next-seo'
import { prisma } from '../../../prisma/prisma'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const groupId = ctx.query.groupId as string

  const groupName = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      name: true,
    },
  })

  return {
    props: {
      groupName: groupName?.name,
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
