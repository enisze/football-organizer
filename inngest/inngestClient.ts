import { Inngest } from "inngest";
import { Events } from "./__generated__/types";

export const inngest = new Inngest<Events>({
  name: "Football-organizer",
  eventKey: process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY,
});
