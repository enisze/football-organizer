import { cronJob } from './cronjobForPayments'
import { sendEventReminderEmail } from './sendEventReminderEmail'
import { sendPaymentAndEventReminderEmails } from './sendPaymentAndEventReminderEmails'
import { sendPaymentReminderEmail } from './sendPaymentReminderEmail'

const functions = [
  cronJob,
  sendPaymentAndEventReminderEmails,
  sendEventReminderEmail,
  sendPaymentReminderEmail,
]

export default functions
