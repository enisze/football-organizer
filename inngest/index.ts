import { cronJob } from './cronjobForPayments'
import { sendPaymentAndEventReminderEmails } from './sendPaymentAndEventReminderEmails'

const functions = [cronJob, sendPaymentAndEventReminderEmails]

export default functions
