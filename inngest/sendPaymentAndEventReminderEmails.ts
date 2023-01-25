import { createFunction } from "inngest";
import { filter, find, map, reduce } from "lodash";
import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from "../prisma/generated/client";
import { PrismaClient } from "../prisma/generated/client";
import apiInstance from "../src/emails/transporter";
import { generateEventReminderTemplate } from "./emailTemplates/eventReminderTemplate";
import { generatePaymentReminderTemplate } from "./emailTemplates/paymentReminderTemplate";
import type { Event__Reminder } from "./__generated__/types";

import { SendSmtpEmail } from "@sendinblue/client";
import { differenceInCalendarDays } from "date-fns";

const prisma = new PrismaClient();

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

  const { participants } = footballEvent;

  //Ids which are available
  const canceledParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
    "CANCELED"
  );

  const joinedParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
    "JOINED"
  );

  const usersEventReminder: string[] = [];
  const usersPaymentReminder: string[] = [];

  const promises = map(
    filter(allUsers, (user) => user.notificationsEnabled),
    async (user) => {
      //Did not interact with the event at all
      if (
        !joinedParticipantIds.includes(user.id) &&
        !canceledParticipantIds.includes(user.id) &&
        participants.length < footballEvent.maxParticipants
      ) {
        //Send event reminder

        const html = generateEventReminderTemplate({
          event: footballEvent,
          userName: user.name,
          participantsAmount: joinedParticipantIds.length,
        }).html;

        const sendSmptMail = new SendSmtpEmail();

        const days = differenceInCalendarDays(footballEvent.date, new Date());

        sendSmptMail.to = [{ email: user.email }];
        sendSmptMail.htmlContent = html;
        sendSmptMail.sender = {
          email: "eniszej@gmail.com",
          name: "Football Organizer",
        };
        sendSmptMail.subject = `Erinnerung: Fussball in ${days} Tagen, ${joinedParticipantIds.length}/${footballEvent.maxParticipants} Teilnehmer!`;

        usersEventReminder.push(user.email);

        return apiInstance.sendTransacEmail(sendSmptMail);
      }

      if (footballEvent.bookingDate && joinedParticipantIds.includes(user.id)) {
        const payment = find(
          footballEvent.payments,
          (payment) => payment.userId === user.id
        );

        if (!payment) {
          //Send payment reminder

          const html = generatePaymentReminderTemplate({
            event: footballEvent,
            userName: user.name,
          }).html;

          const sendSmptMail = new SendSmtpEmail();

          sendSmptMail.to = [{ email: user.email }];
          sendSmptMail.htmlContent = html;
          sendSmptMail.sender = {
            email: "eniszej@gmail.com",
            name: "Football Organizer",
          };
          sendSmptMail.subject = "Erinnerung: Fussball bezahlen";

          usersPaymentReminder.push(user.email);

          return apiInstance.sendTransacEmail(sendSmptMail);
        }
      }
    }
  );

  const responses = await Promise.all(promises);

  const codes = map(responses, (res) =>
    res
      ? res.response.statusCode + " " + res.response.statusMessage
      : "No status"
  );

  console.log(
    `Event reminders: ${JSON.stringify(
      usersEventReminder
    )}, Payment reminders: ${usersPaymentReminder},
    Message results: ${codes}`
  );
  return {
    message: `Event reminders: ${usersEventReminder}.
    Payment reminders: ${usersPaymentReminder},
    Message results: ${codes}`,
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
      if (participant.userEventStatus === eventStatus) {
        return [...acc, participant.id];
      }
      return acc;
    },
    []
  );
};

// job({
//   event: {
//     data: {
//       eventId: "clblbxpwm0002nqy7vxtu5zid",
//     },
//     name: "event/reminder",
//     ts: new Date().getMilliseconds(),
//   },
// });
