import { Button } from '@/ui/button'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { Hero } from '../components/Heading'
import { Navbar } from '../components/Navigation/Navbar'
import { authOptions } from './api/auth/[...nextauth]'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (session?.user?.id) {
    return {
      redirect: {
        destination: '/group',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Home: FunctionComponent = ({}) => {
  return (
    <div className="h-full">
      <NextSeo title="Event Wizard" />
      <Navbar />
      <main className="absolute flex h-full w-full flex-col items-center justify-center">
        <Hero />
        <Link href="/api/auth/signin">
          <Button className="shadow-md shadow-yellow-300/50 ">
            Login / Registrieren
          </Button>
        </Link>
        {/* <ContactForm /> */}
      </main>
    </div>
  )
}

export default Home
