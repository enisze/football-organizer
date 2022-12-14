import compileMjml from "mjml";
import type { Event } from "../../prisma/generated/client";
import { getEventTemplate } from "./helpers/getEventTemplate";

export const generatePaidButCanceledTemplate = ({
  event,
  userName,
}: {
  event: Partial<Event>;
  userName: string;
}) => {
  const eventTemplate = getEventTemplate(event);

  const html = compileMjml(`
<mjml>
  <mj-body background-color="#ccd3e0">
    <mj-section background-color="#1E293B" padding-bottom="0px" padding-top="0">
      <mj-column width="100%">
        <mj-text align="center" color="#ABCDEA" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="18px" padding-top="28px">
    Hallo 
          <p style="font-size:16px; color:white">Enis</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#1E293B" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
        <mj-text align="center" color="#FFF" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px"><span style="font-size:20px; font-weight:bold">
        Jemand hat bezahlt, aber abgesagt.
          <br />
          <span style="font-size:15px">Zu folgendem Event:</span>
        </mj-text>
      </mj-column>
    </mj-section>
<mj-section background-color="#373B44" padding-bottom="15px">
    ${eventTemplate}
    </mj-section>
    <mj-section background-color="#1E293B" padding-bottom="20px" padding-top="20px">

        <mj-text align="center" color="#ABCDEA" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="18px" padding-top="28px">
          <p style="font-size:16px; color:white"><b>${userName}</b> hat das Event bezahlt aber abgesagt.</p>
        </mj-text>

    </mj-section>
    <mj-section background-color="#1E293B" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
        <mj-text align="center" color="#FFF" font-size="15px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="20px">Liebe Grüße,
          <br />
          <span style="font-size:15px">Das Football Organizer Team </span>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `);
  return html;
};
