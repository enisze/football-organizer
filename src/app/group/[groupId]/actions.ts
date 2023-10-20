'use server'
import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import { revalidateGroup } from '@/src/helpers/isOwnerOfGroup'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import type { UserEventStatus } from '@prisma/client'
import { subDays } from 'date-fns'
import { revalidatePath } from 'next/cache'

export const sendPaidButCanceledMailAction = async ({
  eventId,
}: {
  eventId: string
}) => {
  'use server'
  const session = await getServerComponentAuthSession()

  if (!eventId) throw new Error('BAD_REQUEST')

  if (!session?.user?.id) throw new Error('UNAUTHORIZED')

  const event = await prisma.event.findUnique({ where: { id: eventId } })
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  })

  const group = await prisma.group.findUnique({
    where: { id: event?.groupId ?? '' },
    include: { owner: { select: { email: true, name: true } } },
  })

  await sendPaidButCanceledMail(event, user, group?.owner ?? null)

  revalidatePath(`/group/${event?.groupId}`)
}

export const setParticipatingStatus = async ({
  eventId,
  status,
  comment,
}: {
  eventId: string
  status: UserEventStatus

  comment?: string | null
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

  if (!eventId) throw new Error('BAD_REQUEST')
  if (
    event?.participants.filter(
      (participant) => participant.userEventStatus === 'JOINED',
    ).length === event?.maxParticipants &&
    status === 'JOINED'
  )
    throw new Error('PRECONDITION_FAILED')

  switch (status) {
    case 'JOINED':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'JOINED',
          comment: null,
        },
        update: {
          userEventStatus: 'JOINED',
          comment: null,
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })
      revalidatePath(`/group/${event?.groupId}`)
      return
    case 'CANCELED':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'CANCELED',
          comment,
        },
        update: {
          userEventStatus: 'CANCELED',
          comment,
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })

      revalidatePath(`/group/${event?.groupId}`)
      return

    case 'MAYBE':
      await prisma.participantsOnEvents.upsert({
        create: {
          eventId,
          id: userId,
          userEventStatus: 'MAYBE',
          comment: null,
        },
        update: {
          userEventStatus: 'MAYBE',
          comment: null,
        },
        where: {
          id_eventId: {
            eventId,
            id: userId,
          },
        },
      })
      revalidatePath(`/group/${event?.groupId}`)
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
  const dateString = formData.get('bookingdate') as string

  const date = new Date(dateString)

  if (!eventId) throw new Error('BAD_REQUEST')

  await prisma.event.update({
    data: { status: 'BOOKED', bookingDate: subDays(date, 1) },
    where: { id: eventId },
  })

  revalidateGroup()
}

export const revalidateGroupAction = async () => {
  'use server'
  revalidateGroup()
}
