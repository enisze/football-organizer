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
    const allUsers = await prisma.user.findMany()

    if (!allUsers)
      return {
        message: `No users found`,
      }

    const usersWhoGotMails: string[] = []

    const days = differenceInCalendarDays(new Date(event.date), new Date())

    const promises = allUsers
      .filter((user) => user.notificationsEnabled)
      .map(async (user) => {
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
