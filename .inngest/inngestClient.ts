import { Inngest } from "inngest";

export const inngest = new Inngest({
  name: "Football-organizer",
  eventKey: process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY,
});
