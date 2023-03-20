import GroupRequestEmail from '@/emails/GroupRequestEmail'
import { render } from '@react-email/components'
import { SendSmtpEmail } from '@sendinblue/client'
import apiInstance from '../src/emails/transporter'

export const sendGroupRequestEmail = async ({ sender }: { sender: string }) => {
  const sendSmptMail = new SendSmtpEmail()

  const a = render(<GroupRequestEmail />)

  sendSmptMail.to = [{ email: 'eniszej@gmail.com' }]
  sendSmptMail.htmlContent = `<div>
  ${sender} möchte sich für die Gruppe anmelden. <br />
  </div>`
  sendSmptMail.sender = {
    email: sender,
    name: 'Event Wizard',
  }
  sendSmptMail.subject = 'Neue Gruppenanfrage'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
