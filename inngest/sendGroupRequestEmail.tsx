import { GroupRequestEmail } from '@/emails/GroupRequestEmail'
import { render } from '@react-email/components'
import { SendSmtpEmail } from '@sendinblue/client'
import apiInstance from '../src/emails/transporter'

import { sign } from 'jsonwebtoken'

export const sendGroupRequestEmail = async ({
  requester,
}: {
  requester: string
}) => {
  const sendSmptMail = new SendSmtpEmail()

  const token = sign({ email: requester }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  })

  const html = render(<GroupRequestEmail email={requester} token={token} />)

  sendSmptMail.to = [{ email: 'eniszej@gmail.com' }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Event Wizard',
  }
  sendSmptMail.subject = 'Neue Gruppenanfrage'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
