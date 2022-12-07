import { createFunction } from "inngest";
import { forEach, map } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import { sendInBlueTransport } from "../src/emails/transporter";
import type { Event__New } from "./__generated__/types";

const prisma = new PrismaClient();

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

const websiteLink = "https://www.football-organizer.vercel.app";

const job = async ({ event }: { event: Event__New }) => {
  try {
    const allUsers = await prisma.user.findMany();

    if (!allUsers)
      return {
        message: `No users found`,
      };

    const { address, cost, date, endTime, startTime, id } = event.data;

    const names = map(allUsers, (user) => user.email).join(",");

    forEach(allUsers, async (user) => {
      await sendInBlueTransport.sendMail({
        from: '"Football Organizer" <eniszej@gmail.com>',
        to: user.email,
        subject: "EIN NEUES FUSSBALL EVENT WURDE ERSTELLT",
        html: `
    Hey, ein neues Event wurde erstellt. Es findet voraussichtlich zu den Daten statt:
<p>Datum: <strong>${date}</strong></p>
<p>Zeit: <strong>${startTime} - ${endTime} Uhr</strong></p>
<p>Ort: <strong>${address}</strong></p>
<p>Preis: <strong>${cost / 10} €</strong></p>
<p><a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a></p>

  <a href="${
    websiteLink + "/events/" + id
  }">Hier kannst du Zusagen oder die Benachrichtung zu diesem Event abschalten.</a>
    `,
        // headers: { "x-myheader": "test header" },
      });
    });

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
