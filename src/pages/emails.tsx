import { map } from "lodash";
import type { FunctionComponent } from "react";
import { generateEventReminderTemplate } from "../../inngest/emailTemplates/eventReminderTemplate";
import { generateNewEventTemplate } from "../../inngest/emailTemplates/newEventTemplate";
import { generatePaymentReminderTemplate } from "../../inngest/emailTemplates/paymentReminderTemplate";

const EmailPage: FunctionComponent<{ emails: string[] }> = ({ emails }) => {
  return (
    <div>
      {map(emails, (email) => {
        return <div dangerouslySetInnerHTML={{ __html: email }}></div>;
      })}
    </div>
  );
};

export default EmailPage;

export async function getServerSideProps(context: any) {
  const eventReminder = generateEventReminderTemplate();
  const newEvent = generateNewEventTemplate();
  const paymentReminder = generatePaymentReminderTemplate();

  return {
    props: {
      emails: [eventReminder.html, newEvent.html, paymentReminder.html],
    },
  };
}
