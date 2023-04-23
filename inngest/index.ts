import { cronJob } from './cronjobForPayments'
import { sendEventReminderEmail } from './sendEventReminderEmail'
import { sendPaymentReminderEmail } from './sendPaymentReminderEmail'
import { triggerPaymentAndEventReminder } from './triggerPaymentAndEventReminder'

const functions = [
  cronJob,
  triggerPaymentAndEventReminder,
  sendEventReminderEmail,
  sendPaymentReminderEmail,
]

export default functions
