import type { ParticipantsOnEvents, UserEventStatus } from "@prisma/client";
import { createFunction } from "inngest";
import { find, forEach, reduce } from "lodash";
import { PrismaClient } from "../prisma/generated/client";
import { sendInBlueTransport } from "../src/emails/transporter";
import { generateEventReminderTemplate } from "./emailTemplates/eventReminderTemplate";
import { generatePaymentReminderTemplate } from "./emailTemplates/paymentReminderTemplate";
import type { Event__Reminder } from "./__generated__/types";

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

      const html = generateEventReminderTemplate({
        event: footballEvent,
        userName: user.name,
      }).html;

      usersWhoGotMails.push(user.email);
      await sendInBlueTransport.sendMail({
        from: '"Football Organizer" <eniszej@gmail.com>',
        to: user.email,
        subject: `ERINNERUNG: FUSSBALL FINDET STATT ${participants.length}/10 ! `,
        html,
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

          const html = generatePaymentReminderTemplate({
            event: footballEvent,
            userName: user.name,
          }).html;

          await sendInBlueTransport.sendMail({
            from: '"Football Organizer" <eniszej@gmail.com>',
            to: user.email,
            subject: "ERINNERUNG: DU HAST FUSSBALL NOCH NICHT BEZAHLT ! ",
            html,
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
      if (participant.userEventStatus === eventStatus) {
        return [...acc, participant.id];
      }
      return acc;
    },
    []
  );
};

job({
  event: {
    data: {
      eventId: "clbd6yt8v0004nqoqmj2c8zdl",
    },
    name: "event/reminder",
    ts: new Date().getMilliseconds(),
  },
});
