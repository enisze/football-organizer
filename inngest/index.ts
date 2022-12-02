import { cronjobForPayments } from "./cronjobForPayments";
import { sendNewEventEmail } from "./sendNewEventEmail";
import { sendPaymentAndEventReminder } from "./sendPaymentAndEventReminderEmails";

const functions = [
  sendNewEventEmail,
  sendPaymentAndEventReminder,
  cronjobForPayments,
];

export default functions;
