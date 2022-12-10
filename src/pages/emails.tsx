import { map } from "lodash";
import type { FunctionComponent } from "react";
import { generateEventReminderTemplate } from "../../inngest/emailTemplates/eventReminderTemplate";
import { generateNewEventTemplate } from "../../inngest/emailTemplates/newEventTemplate";
import { generatePaymentReminderTemplate } from "../../inngest/emailTemplates/paymentReminderTemplate";
import { Event__New } from "../../inngest/__generated__/types";

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
  const dummyEvent: Event__New = {
    data: {
      id: "test",
      address: "test",
      cost: 10,
      date: "t",
      startTime: "a",
      endTime: "b",
    },
    name: "event/new",
    ts: new Date().getMilliseconds(),
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
  });

  return {
    props: {
      emails: [newEvent.html],
    },
  };
}
