import { createFunction } from "inngest";
import { PrismaClient } from "../prisma/generated/client";
import type { Event__Reminder } from "./__generated__/types";

const prisma = new PrismaClient();

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

const job = async ({ event }: { event: Event__Reminder }) => {
  const id = event.data.eventId;

  if (!prisma)
    return {
      status: 400,
      body: { message: "No prisma" },
    };

  let allUsers;
  try {
    allUsers = await prisma.user.findMany();
  } catch (error: any) {
    return {
      statusCode: 400,
      body: { message: `No users ${error}` },
    };
  }
  return {
    status: 400,
    body: { message: `test` },
  };

  // const footballEvent = await prisma.event.findUnique({
  //   where: { id },
  //   include: { participants: true, payments: true },
  // });

  // if (!footballEvent)
  //   return {
  //     status: 400,
  //     body: { message: "No football event" },
  //   };

  // const { date, startTime, endTime, address, cost } = footballEvent;

  // const participantIds = reduce(
  //   footballEvent.participants,
  //   (acc: string[], participant) => {
  //     return [...acc, participant.id];
  //   },
  //   []
  // );

  // if (!participantIds)
  //   return {
  //     status: 400,
  //     body: { message: "No ids" },
  //   };

  // forEach(allUsers, async (user) => {
  //   if (!participantIds.includes(user.id)) {
  //     //Send event reminder
  //     await sendInBlueTransport.sendMail({
  //       from: '"Sender Name" <eniszej@gmail.com>',
  //       to: user.email,
  //       subject: "ERINNERUNG: FUSSBALL FINDET STATT :) ",
  //       html: `<p>Hey ${user.name},</p>
  //         <p>Folgendes Event findet bald statt: </p>
  // <p>Datum: <strong>${date}</strong></p>
  // <p>Zeit: <strong>${startTime} - ${endTime} Uhr</strong></p>
  // <p>Ort: <strong>${address}</strong></p>
  // <p>Preis: <strong>${cost}</strong></p>
  // <a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a>
  // <p><strong>Sag doch bitte zu und komm vorbei :) </strong></p>
  //         `,
  //       headers: { "x-myheader": "test header" },
  //     });
  //   } else {
  //     const payment = find(
  //       footballEvent.payments,
  //       (payment) => payment.userId === user.id
  //     );
  //     if (!payment) {
  //       //Send payment reminder
  //       await sendInBlueTransport.sendMail({
  //         from: '"Sender Name" <eniszej@gmail.com>',
  //         to: user.email,
  //         subject: "ERINNERUNG: DU HAST FUSSBALL NOCH NICHT BEZAHLT :) ",
  //         html: `<p>Hey ${user.name},</p>
  //         <p>Du hast zu folgendem Event zugesagt: </p>
  // <p>Datum: <strong>${date}</strong></p>
  // <p>Zeit: <strong>${startTime} - ${endTime} Uhr</strong></p>
  // <p>Ort: <strong>${address}</strong></p>
  // <p>Preis: <strong>${cost}</strong></p>

  // <p><strong>Bezahl doch bitte ueber den unten stehenden Link bspw. :) Dankee </strong></p>

  // <a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a>
  //         `,
  //         headers: { "x-myheader": "test header" },
  //       });
  //     }
  //   }
  // });

  // return {
  //   status: 200,
  //   body: { message: "Done" },
  // };
};
export const sendPaymentAndEventReminder = createFunction(
  "Send Payment And Event Reminder",
  "event/reminder",
  job
);
