import { ParticipantsOnEvents, UserEventStatus } from "@prisma/client";
import { createFunction } from "inngest";
import { find, forEach, reduce } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import { sendInBlueTransport } from "../src/emails/transporter";
import type { Event__Reminder } from "./__generated__/types";

const prisma = new PrismaClient();

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

const job = async ({ event }: { event: Event__Reminder }) => {
  const id = event.data.eventId;

  const allUsers = await prisma.user.findMany();

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

  //Ids which are available
  const availableParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
    "AVAILABLE"
  );

  const joinedParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
    "JOINED"
  );

  const usersWhoGotMails: string[] = [];

  forEach(allUsers, async (user) => {
    if (availableParticipantIds.includes(user.id)) {
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
    process.env.NEXT_PUBLIC_BASE_URL + "/events/" + id
  }">Hier kannst du Zusagen oder die Benachrichtung zu diesem Event abschalten.</a>
          `,
      });
    }

    if (joinedParticipantIds.includes(user.id)) {
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
          });
        } catch (error: any) {
          return { message: "sending email failed" };
        }
      }
    }
  });

  console.log(
    `Users who got mails: ${usersWhoGotMails}, ${availableParticipantIds}`
  );
  return {
    message: `Users who got mails: ${usersWhoGotMails}, ${availableParticipantIds},  `,
  };
};
export const sendPaymentAndEventReminder = createFunction(
  "Send Payment And Event Reminder",
  "event/reminder",
  job
);

const getParticipantIdsByStatus = (
  participants: ParticipantsOnEvents[],
  eventStatus: UserEventStatus
) => {
  return reduce(
    participants,
    (acc: string[], participant) => {
      console.log(participant.userEventStatus);
      if (participant.userEventStatus === eventStatus) {
        return [...acc, participant.id];
      }
      return acc;
    },
    []
  );
};
