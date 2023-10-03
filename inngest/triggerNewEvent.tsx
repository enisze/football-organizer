import { inngest } from '@/src/server/db/client'
import { differenceInCalendarDays } from 'date-fns'

export const triggerNewEvent = inngest.createFunction(
  { name: 'Trigger New Event Email' },
  { event: 'event/new' },
  async ({ step, event: inngestEvent, prisma }) => {
    await step.run('test', async () => {
      const eventId = inngestEvent.data.id

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { participants: true },
      })

      console.log('test')

      if (!event) return { message: `No event found ${eventId}` }

      if (!event.groupId) return { message: `No group found ${event.groupId}` }

      try {
        const usersOnGroup = await prisma.group.findUnique({
          where: {
            id: event.groupId,
          },
          select: { users: true },
        })

        if (!usersOnGroup)
          return {
            message: `No users found`,
          }

        const usersWhoGotMails: string[] = []

        const days = differenceInCalendarDays(new Date(event.date), new Date())

        const usersOfGroup = await Promise.all(
          usersOnGroup.users.map(async (user) => {
            return await prisma.user.findUnique({ where: { id: user.id } })
          }),
        )

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

        return { success: true }
      } catch (error: unknown) {
        return {
          message: `No users ${error}`,
        }
      }
    })
  },
)
