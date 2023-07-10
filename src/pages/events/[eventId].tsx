import { EventCard } from '@/src/components/Events/EventCard'
import { Button } from '@/ui/button'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { prisma } from '../../../prisma/prisma'

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getServerSession } from 'next-auth'
import { trpc } from '../../utils/trpc'
import { authOptions } from '../api/auth/[...nextauth]'

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.eventId as string

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  })

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      event: event,
    },
  }
}

const EventPage: FunctionComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ event }) => {
  const trpcContext = trpc.useContext()

  const { mutate: setStatus, isSuccess } =
    trpc.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  const url = process.env.NEXT_PUBLIC_BASE_URL as string

  const link = new URL(url)

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to top, #373B44, #73C8A9)',
        }}
        className="fixed -z-10 flex h-full w-full"
      />

      <div className="mx-20 flex flex-col">
        <div className="flex flex-col items-center">
          <div className="my-5 flex flex-col items-center justify-center gap-y-2 rounded p-5">
            <Button
              onClick={() =>
                setStatus({ eventId: event.id, status: 'CANCELED' })
              }
              variant="outline"
            >
              Keine Emails mehr erhalten
            </Button>

            {isSuccess && (
              <span className="text-green-500">
                Du hast dich erfolgreich abgemeldet.
              </span>
            )}
            <Link href={link}>
              <span>Zur Startseite</span>
            </Link>
          </div>
          <EventCard event={event} />
        </div>
      </div>
    </>
  )
}

export default EventPage
