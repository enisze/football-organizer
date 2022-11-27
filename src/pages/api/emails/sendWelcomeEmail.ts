import { createFunction } from "inngest";
import { sendEmail } from "../../../emails/sender";
// This function runs the code and will be called in the background.
const job = async ({ event }) => {
  await sendEmail();
};
export const sendWelcomeEmail = createFunction(
  "Send Welcome Email", // The name of your function, used for observability.
  "user/new", // The event that triggers this function.
  job // The function code, defined above.
);
