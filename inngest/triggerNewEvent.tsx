import { inngest } from '@/src/server/db/client'
import { differenceInCalendarDays } from 'date-fns'

export const triggerNewEvent = inngest.createFunction(
  { name: 'Trigger New Event Email' },
  { event: 'event/new' },
  async ({ step, event: inngestEvent, prisma }) => {
    const eventId = inngestEvent.data.id

    const event = await step.run('get event', async () => {
      console.log('getting event')
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { participants: true },
      })

      return event
    })

    if (!event) return { message: `No event found ${eventId}` }

    if (!event.groupId) return { message: `No group found ${event.groupId}` }

    const usersOfGroup = await step.run('get users', async () => {
      console.log('getting users')
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

    await step.run('sending newEmail event', async () => {
      console.log('sending event')
      const usersWhoGotMails: string[] = []

      const days = differenceInCalendarDays(new Date(event.date), new Date())

      usersOfGroup
        .filter((user) => user?.notificationsEnabled)
        .forEach(async (user) => {
          if (!user) return

          await inngest.send({
            name: 'event/newEmail',
            data: {
              user,
              id: event.id,
              days,
            },
          })

          usersWhoGotMails.push(user.email)
        })
    })

    return { success: true }
  },
)
