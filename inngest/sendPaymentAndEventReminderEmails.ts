import { createFunction } from "inngest";
import { find, forEach, reduce } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import { sendInBlueTransport } from "../src/emails/transporter";
import type { Event__Reminder } from "./__generated__/types";

const prisma = new PrismaClient();

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

const websiteLink = "https://www.football-organizer.vercel.app";

const job = async ({ event }: { event: Event__Reminder }) => {
  const id = event.data.eventId;

  let allUsers;
  try {
    allUsers = await prisma.user.findMany();
  } catch (error: any) {
    return {
      message: `No users ${error}`,
    };
  }
  if (!allUsers)
    return {
      message: `No users found`,
    };

  const footballEvent = await prisma.event.findUnique({
    where: { id },
    include: { participants: true, payments: true },
  });

  if (!footballEvent)
    return {
      message: "No football event",
    };

  const { date, startTime, endTime, address, cost, participants } =
    footballEvent;

  //Ids which have not canceled yet
  const participantIds = reduce(
    footballEvent.participants,
    (acc: string[], participant) => {
      if (
        participant.userEventStatus === "AVAILABLE" ||
        participant.userEventStatus === "JOINED"
      ) {
        return [...acc, participant.id];
      }
      return acc;
    },
    []
  );

  if (!participantIds)
    return {
      message: "No ids",
    };

  const usersWhoGotMails: string[] = [];

  forEach(allUsers, async (user) => {
    if (!participantIds.includes(user.id)) {
      //Send event reminder

      usersWhoGotMails.push(user.email);
      await sendInBlueTransport.sendMail({
        from: '"Football Organizer" <eniszej@gmail.com>',
        to: user.email,
        subject: `ERINNERUNG: FUSSBALL FINDET STATT ${participants.length}/10 ! `,
        html: `<p>Hey ${user.name},</p>
          <p>Folgendes Event findet bald statt: </p>
  <p>Datum: <strong>${date.toDateString()}</strong></p>
  <p>Zeit: <strong>${startTime} - ${endTime} Uhr</strong></p>
  <p>Ort: <strong>${address}</strong></p>
  <p>Preis: <strong>${cost / 10} €</strong></p>
  <a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a>
  <p><strong>Es sind noch ${
    10 - participants.length
  } Plätze frei!. Sag doch bitte zu und komm vorbei. </strong></p>
  <a href="${
    websiteLink + "/events/" + id
  }">Hier kannst du Zusagen oder die Benachrichtung zu diesem Event abschalten.</a>
          `,
        headers: { "x-myheader": "test header" },
      });
    } else {
      const payment = find(
        footballEvent.payments,
        (payment) => payment.userId === user.id
      );

      if (!payment) {
        //Send payment reminder
        try {
          usersWhoGotMails.push(user.email);
          await sendInBlueTransport.sendMail({
            from: '"Football Organizer" <eniszej@gmail.com>',
            to: user.email,
            subject: "ERINNERUNG: DU HAST FUSSBALL NOCH NICHT BEZAHLT ! ",
            html: `<p>Hey ${user.name},</p>
          <p>Du hast zu folgendem Event zugesagt: </p>
  <p>Datum: <strong>${date.toDateString()}</strong></p>
  <p>Zeit: <strong>${startTime} - ${endTime} Uhr</strong></p>
  <p>Ort: <strong>${address}</strong></p>
  <p>Preis: <strong>${cost / 10} €</strong></p>

  <p><strong>Bezahl doch bitte über den unten stehenden Link, Danke. </strong></p>

  <a href="${paypalLink}">Hier kannst du bei Paypal bezahlen :)</a>
          `,
            headers: { "x-myheader": "test header" },
          });
        } catch (error: any) {
          return { message: "sending email failed" };
        }
      }
    }
  });

  return {
    message: `Users who got mails: ${usersWhoGotMails}, ${participantIds},  `,
  };
};
export const sendPaymentAndEventReminder = createFunction(
  "Send Payment And Event Reminder",
  "event/reminder",
  job
);
