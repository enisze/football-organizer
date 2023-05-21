import { inngest } from './inngestClient'
import { sendNewRefreshTokenMail } from './sendNewRefreshTokenMail'
export const sendMissingTokenMail = inngest.createFunction(
  { name: 'Send Missing token Mail' },
  { event: 'event/missingTokenEmail' },
  async ({ event }) => {
    const { authorizeUrl, ownerEmail, ownerName } = event.data

    await sendNewRefreshTokenMail({
      link: authorizeUrl,
      email: ownerEmail,
      name: ownerName,
    })
  },
)
