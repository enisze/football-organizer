// ./pages/api/inngest.ts
import { serve } from "inngest/next";
import { sendNewEventEmail } from "../../../inngest/sendNewEventEmail";
import { sendPaymentAndEventReminder } from "../../../inngest/sendPaymentAndEventReminderEmails";
export default serve("My App", [
  sendNewEventEmail,
  sendPaymentAndEventReminder,
]);
