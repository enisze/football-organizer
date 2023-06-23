import { cronJob } from './cronjobForPayments'
import { sendEventReminderEmail } from './sendEventReminderEmail'
import { sendMissingTokenMail } from './sendMissingTokenEmail'
import { sendNewEventEmail } from './sendNewEventEmail'
import { sendPaymentReminderEmail } from './sendPaymentReminderEmail'
import { triggerNewEvent } from './triggerNewEvent'
import { triggerPaymentAndEventReminder } from './triggerPaymentAndEventReminder'

const functions = [
  cronJob,
  triggerPaymentAndEventReminder,
  sendEventReminderEmail,
  sendPaymentReminderEmail,
  triggerNewEvent,
  sendNewEventEmail,
  sendMissingTokenMail,
]

export default functions
