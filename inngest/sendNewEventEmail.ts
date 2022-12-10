import { createFunction } from "inngest";
import { forEach, map } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import { sendInBlueTransport } from "../src/emails/transporter";
import { generateNewEventTemplate } from "./emailTemplates/newEventTemplate";
import type { Event__New } from "./__generated__/types";

const prisma = new PrismaClient();

const job = async ({ event }: { event: Event__New }) => {
  try {
    const allUsers = await prisma.user.findMany();

    if (!allUsers)
      return {
        message: `No users found`,
      };

    const names = map(allUsers, (user) => user.email).join(",");

    forEach(allUsers, async (user) => {
      const html = generateNewEventTemplate({
        event: { ...event.data, date: new Date(event.data.date) },
        userName: user.name,
      }).html;

      await sendInBlueTransport.sendMail({
        from: '"Football Organizer" <eniszej@gmail.com>',
        to: user.email,
        subject: "EIN NEUES FUSSBALL EVENT WURDE ERSTELLT",
        html,
      });
    });

    console.log(`Message sent to: ${names}`);

    return { message: `Messages sent to: ${names}` };
  } catch (error: any) {
    return {
      message: `No users ${error}`,
    };
  }
};
export const sendNewEventEmail = createFunction(
  "Send new Event Email",
  "event/new",
  job
);

// job({
//   event: {
//     data: {
//       id: "test",
//       address: "test",
//       cost: 10,
//       date: "t",
//       startTime: "a",
//       endTime: "b",
//     },
//     name: "event/new",
//     ts: new Date().getMilliseconds(),
//   },
// });
