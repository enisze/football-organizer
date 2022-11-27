// ./pages/api/inngest.ts
import { serve } from "inngest/next";
import { sendNewEventEmail } from "./emails/sendNewEventEmail";
import { sendWelcomeEmail } from "./emails/sendWelcomeEmail";
export default serve("My App", [sendNewEventEmail, sendWelcomeEmail]);
