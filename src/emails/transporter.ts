import 'dotenv/config'
import { MailerSend } from 'mailersend'

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY ?? '',
})

export default mailerSend
