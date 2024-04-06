import { inngest } from '@/src/server/db/client'
import { addDays, differenceInCalendarDays } from 'date-fns'
import { getParticipantIdsByStatus } from './triggerPaymentAndEventReminder'

export const triggerNewEvent = inngest.createFunction(
  { name: 'Trigger New Event Email' },
  { event: 'event/new' },
  async ({ step, event: inngestEvent, prisma, logger }) => {
    const eventId = inngestEvent.data.id

    const event = await step.run('get event', async () => {
      logger.info('getting event')

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { participants: true },
      })
      return event
    })

    if (!event) return { message: `No event found ${eventId}` }

    if (!event.groupId) return { message: `No group found ${event.groupId}` }

    const usersOfGroup = await step.run('get users', async () => {
      logger.info('getting users')
      try {
        const usersOnGroup = await prisma.group.findUnique({
          where: {
            id: event.groupId ?? undefined,
          },
          select: { users: true },
        })

        if (!usersOnGroup) return []

        const usersOfGroup = await Promise.all(
          usersOnGroup.users.map(async (user) => {
            return await prisma.user.findUnique({ where: { id: user.id } })
          }),
        )

        return usersOfGroup
      } catch (error: unknown) {
        console.log(error)
      }
    })

    if (!usersOfGroup) return { message: `No users found` }

    logger.info('sending event')

    const days = differenceInCalendarDays(new Date(event.date), new Date())

    const filteredUsers = usersOfGroup.filter(
      (user) => user?.notificationsEnabled,
    )

    logger.info('filtered users', filteredUsers)

    filteredUsers.forEach(async (user) => {
      if (!user) return

      await step.sendEvent({
        name: 'event/newEmail',
        data: {
          user,
          id: event.id,
          days,
        },
      })
    })
    await step.sleepUntil(addDays(new Date(event.createdAt), 7))

    const newEvent = await step.run('get event', async () => {
      logger.info('getting event after some days')

      const event = await prisma.event.findUnique({
        where: { id: eventId, NOT: { status: 'CANCELED' } },
        include: { participants: true },
      })
      return event
    })

    if (!newEvent)
      return { message: `No event found ${eventId} / Or event canceled` }

    const usersEventReminder: { name: string; email: string }[] = []

    const allGroupMembers = await step.run('getting members', async () => {
      const groupMembers = await prisma.group.findUnique({
        where: { id: newEvent.groupId ?? undefined },
        select: { users: true },
      })

      if (!groupMembers) return []

      const allGroupMembers = await Promise.all(
        groupMembers.users.map(async (user) => {
          return await prisma.user.findUnique({ where: { id: user.id } })
        }),
      )

      return allGroupMembers
    })

    if (!newEvent)
      return {
        message: 'No event',
      }

    if (!allGroupMembers)
      return {
        message: 'No group members',
      }

    const { participants } = newEvent

    const canceledParticipantIds = getParticipantIdsByStatus(
      newEvent.participants,
      'CANCELED',
    )

    const joinedParticipantIds = getParticipantIdsByStatus(
      newEvent.participants,
      'JOINED',
    )

    const membersToRemindEvent = allGroupMembers.filter(
      (user) =>
        !canceledParticipantIds.includes(user?.id ?? '') &&
        !joinedParticipantIds.includes(user?.id ?? ''),
    )

    if (participants.length < newEvent.maxParticipants) {
      membersToRemindEvent
        .filter((user) => user?.notificationsEnabled)
        .forEach((user) => {
          if (!user) return
          usersEventReminder.push({ email: user.email, name: user.name })
        })
    }

    usersEventReminder.forEach(async (user) => {
      await step.sendEvent({
        name: 'event/reminderEmail',
        data: {
          user,
          id: newEvent.id,
        },
      })
    })

    return { success: true }
  },
)
