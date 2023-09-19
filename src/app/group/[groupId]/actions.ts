import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import type { UserEventStatus } from '@/prisma/generated/client'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { TRPCError } from '@trpc/server'
import { revalidatePath } from 'next/cache'

export const sendPaidButCanceledMailAction = async ({
  eventId,
}: {
  eventId: string
}) => {
  const session = await getServerComponentAuthSession()

  const event = await prisma.event.findUnique({ where: { id: eventId } })
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  })

  const group = await prisma.group.findUnique({
    where: { id: event?.groupId ?? '' },
    include: { owner: { select: { email: true, name: true } } },
  })

  //TODO: fix this
  await sendPaidButCanceledMail(event, user, group?.owner ?? null)

  revalidatePath(`/group/${event?.groupId}`)
}

export const setParticipatingStatus = async ({
  eventId,
  status,
}: {
  eventId: string
  status: UserEventStatus
}) => {
  const session = await getServerComponentAuthSession()

  const userId = session?.user?.id

  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { participants: true },
  })
  if (
    event?.participants.filter(
      (participant) => participant.userEventStatus === 'JOINED',
    ).length === event?.maxParticipants
  )
    throw new TRPCError({ code: 'PRECONDITION_FAILED' })

  switch (status) {
    case 'JOINED':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'JOINED',
        },
        update: {
          userEventStatus: 'JOINED',
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })
      revalidatePath(`/group/${event?.groupId}`)
      revalidatePath(`/group`)
      return
    case 'CANCELED':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'CANCELED',
        },
        update: {
          userEventStatus: 'CANCELED',
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })

      revalidatePath(`/group/${event?.groupId}`)
      revalidatePath(`/group`)
      return

    case 'MAYBE':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'MAYBE',
        },
        update: {
          userEventStatus: 'MAYBE',
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })
      revalidatePath(`/group/${event?.groupId}`)
      revalidatePath(`/group`)
      return
    default:
      throw new TRPCError({ code: 'BAD_REQUEST' })
  }
}
