import { createFunction } from "inngest";
import { sendEmail } from "../../../emails/sender";
// This function runs the code and will be called in the background.
const job = async ({ event }) => {
  //TODO: Send a proper email with proper text at least :D
  await sendEmail();
};
export const sendNewEventEmail = createFunction(
  "Send new Event Email", // The name of your function, used for observability.
  "event/new", // The event that triggers this function.
  job // The function code, defined above.
);
