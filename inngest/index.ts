import { sendNewEventEmail } from "./sendNewEventEmail";
import { sendPaymentAndEventReminder } from "./sendPaymentAndEventReminderEmails";

const functions = [sendNewEventEmail, sendPaymentAndEventReminder];

export default functions;
