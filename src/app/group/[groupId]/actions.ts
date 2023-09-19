'use server'
import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import type { UserEventStatus } from '@/prisma/generated/client'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { subDays } from 'date-fns'
import { revalidatePath } from 'next/cache'

export const sendPaidButCanceledMailAction = async ({
  eventId,
}: {
  eventId: string
}) => {
  'use server'
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
  'use server'
  const session = await getServerComponentAuthSession()

  const userId = session?.user?.id

  if (!userId) throw new Error('UNAUTHORIZED')
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('UNAUTHORIZED')

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { participants: true },
  })
  if (
    event?.participants.filter(
      (participant) => participant.userEventStatus === 'JOINED',
    ).length === event?.maxParticipants
  )
    throw new Error('PRECONDITION_FAILED')

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
      throw new Error('BAD_REQUEST')
  }
}

export const bookEvent = async ({
  formData,
  eventId,
}: {
  eventId: string
  formData: FormData
}) => {
  'use server'
  const dateString = formData.get('date') as string

  const date = new Date(dateString)

  await prisma.event.update({
    data: { status: 'BOOKED', bookingDate: subDays(date, 1) },
    where: { id: eventId },
  })
}

export const setEventCommentAction = async ({
  comment,
  eventId,
}: {
  comment: string | null
  eventId: string
}) => {
  'use server'
  const session = await getServerComponentAuthSession()

  const id = session?.user?.id
  if (!id) throw new Error('UNAUTHORIZED')

  return await prisma.participantsOnEvents.update({
    where: { id_eventId: { id, eventId } },
    data: { comment },
  })
}
