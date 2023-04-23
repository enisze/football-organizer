import { differenceInCalendarDays } from 'date-fns'
import { PrismaClient } from '../prisma/generated/client'

import { inngest } from './inngestClient'

const prisma = new PrismaClient()

export const triggerNewEvent = inngest.createFunction(
  { name: 'Trigger New Event Email' },
  { event: 'event/new' },
  async ({ event: inngestEvent }) => {
    const eventId = inngestEvent.data.id

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true, payments: true },
    })

    if (!event) return { message: `No event found ${eventId}` }

    try {
      const usersOnGroup = await prisma.userOnGroups.findMany({
        where: {
          groupId: event.groupId ?? '',
        },
      })

      if (!usersOnGroup)
        return {
          message: `No users found`,
        }

      const usersWhoGotMails: string[] = []

      const days = differenceInCalendarDays(new Date(event.date), new Date())

      const usersOfGroup = await Promise.all(
        usersOnGroup.map(async (user) => {
          return await prisma.user.findUnique({ where: { id: user.id } })
        }),
      )

      usersOfGroup
        .filter((user) => user?.notificationsEnabled)
        .forEach(async (user) => {
          if (!user) return

          await inngest.send('event/newEmail', {
            data: {
              user,
              id: event.id,
              days,
            },
          })

          usersWhoGotMails.push(user.email)
        })

      return { success: true }
    } catch (error: any) {
      return {
        message: `No users ${error}`,
      }
    }
  },
)
