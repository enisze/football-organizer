import { cronJob } from './cronjobForPayments'
import { sendEventReminderEmail } from './sendEventReminderEmail'
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
]

export default functions
