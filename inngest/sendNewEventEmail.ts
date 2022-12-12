import { SendSmtpEmail } from "@sendinblue/client";
import { createFunction } from "inngest";
import { forEach } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import apiInstance from "../src/emails/transporter";
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

    const usersWhoGotMails: string[] = [];

    forEach(allUsers, async (user) => {
      const html = generateNewEventTemplate({
        event: { ...event.data, date: new Date(event.data.date) },
        userName: user.name,
      }).html;

      const sendSmptMail = new SendSmtpEmail();

      sendSmptMail.to = [{ email: user.email }];
      sendSmptMail.htmlContent = html;
      sendSmptMail.sender = {
        email: "eniszej@gmail.com",
        name: "Football Organizer",
      };
      sendSmptMail.subject = "EIN NEUES FUSSBALL EVENT WURDE ERSTELLT";

      usersWhoGotMails.push(user.email);
      const { response } = await apiInstance.sendTransacEmail(sendSmptMail);
      console.log(response.statusCode, response.statusMessage);
    });

    console.log(`Message sent to: ${JSON.stringify(usersWhoGotMails)}`);

    return { message: `Messages sent to: ${usersWhoGotMails}` };
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
