// ./pages/api/inngest.ts
import { serve } from "inngest/next";
import { sendNewEventEmail } from "./emails/sendNewEventEmail";
import { sendPaymentAndEventReminder } from "./emails/sendPaymentAndEventReminderEmails";
export default serve("My App", [
  sendNewEventEmail,
  sendPaymentAndEventReminder,
]);