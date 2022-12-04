import { createFunction } from "inngest";
import { forEach } from "lodash";
import { sendInBlueTransport } from "../src/emails/transporter";
import type { Event__New } from "./__generated__/types";

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

const job = async ({ event }: { event: Event__New }) => {
  const allUsers = await prisma?.user.findMany();
  const { address, cost, date, endTime, startTime } = event.data;

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
<p>Preis: <strong>${cost}</strong></p>
<a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a>
    `,
      headers: { "x-myheader": "test header" },
    });
  });
};
export const sendNewEventEmail = createFunction(
  "Send new Event Email",
  "event/new",
  job
);
