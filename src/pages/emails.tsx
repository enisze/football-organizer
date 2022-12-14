import { map } from "lodash";
import type { FunctionComponent } from "react";
import { generateEventReminderTemplate } from "../../inngest/emailTemplates/eventReminderTemplate";
import { generateNewEventTemplate } from "../../inngest/emailTemplates/newEventTemplate";
import { generatePaymentReminderTemplate } from "../../inngest/emailTemplates/paymentReminderTemplate";
import type { Event } from "../../prisma/generated/client";

const EmailPage: FunctionComponent<{ emails: string[] }> = ({ emails }) => {
  return (
    <div>
      {map(emails, (email, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: email }}></div>
        );
      })}
    </div>
  );
};

export default EmailPage;

export async function getServerSideProps(context: any) {
  const dummyEvent: Partial<Event> = {
    id: "test",
    address: "test",
    cost: 10,
    date: new Date(),
    startTime: "a",
    endTime: "b",
  };

  const newEvent = generateNewEventTemplate({
    event: dummyEvent,
    userName: "Testname",
  });
  const paymentReminder = generatePaymentReminderTemplate({
    event: dummyEvent,
    userName: "Testname",
  });

  const eventReminder = generateEventReminderTemplate({
    event: dummyEvent,
    userName: "Testname",
    participantsAmount: 5,
  });

  return {
    props: {
      emails: [newEvent.html, paymentReminder.html, eventReminder.html],
    },
  };
}
