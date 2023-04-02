import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import { differenceInCalendarDays } from 'date-fns'
import { NewEvent } from '../emails/NewEvent'
import type { Event } from '../prisma/generated/client'
import { PrismaClient } from '../prisma/generated/client'
import apiInstance from '../src/emails/transporter'

const prisma = new PrismaClient()

export const sendNewEventEmail = async ({ event }: { event: Event }) => {
  try {
    const usersOnGroup = await prisma.userOnGroups.findMany({
      where: { groupId: event.groupId ?? '' },
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

    const promises = usersOfGroup
      .filter((user) => user?.notificationsEnabled)
      .map(async (user) => {
        if (!user) return

        const html = render(<NewEvent event={event} userName={user.name} />)

        const sendSmptMail = new SendSmtpEmail()

        sendSmptMail.to = [{ email: user.email }]
        sendSmptMail.htmlContent = html
        sendSmptMail.sender = {
          email: 'eniszej@gmail.com',
          name: 'Event Wizard',
        }
        sendSmptMail.subject = `NEUES FUSSBALL EVENT: In ${days} Tagen`

        usersWhoGotMails.push(user.email)
        return apiInstance.sendTransacEmail(sendSmptMail)
      })

    const responses = await Promise.all(promises)

    const codes = responses.map(
      (res) => res?.response.statusCode + ' ' + res?.response.statusMessage,
    )

    console.log(`Message sent to: ${JSON.stringify(usersWhoGotMails)},
    Message results: ${codes}`)

    return { success: true }
  } catch (error: any) {
    return {
      message: `No users ${error}`,
    }
  }
}
