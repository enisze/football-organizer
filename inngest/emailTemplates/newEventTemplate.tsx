import compileMjml from "mjml";
import type { Event__New } from "../__generated__/types";
import { paypalLink } from "./helpers/constants";
import { getEventTemplate } from "./helpers/getEventTemplate";

export const generateNewEventTemplate = ({
  event,
  userName,
}: {
  event: Event__New;
  userName: string;
}) => {
  const { id } = event.data;

  const eventLink = process.env.NEXT_PUBLIC_BASE_URL + "/events/" + id;

  const eventTemplate = getEventTemplate(event);

  const html = compileMjml(`
<mjml>
  <mj-body background-color="#ccd3e0">
    <mj-section background-color="#1E293B" padding-bottom="0px" padding-top="0">
      <mj-column width="100%">
        <mj-text align="center" color="#ABCDEA" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="18px" padding-top="28px">
    Hallo 
          <p style="font-size:16px; color:white">${userName}</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#1E293B" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
        <mj-text align="center" color="#FFF" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px"><span style="font-size:20px; font-weight:bold">
Ein neues Event wurde erstellt.
          <br />
          <span style="font-size:15px">Es findet voraussichtlich zu den Daten statt:</span>
        </mj-text>
      </mj-column>
    </mj-section>
    ${eventTemplate}
    <mj-section background-color="#1E293B" padding-bottom="20px" padding-top="20px">
      <mj-column width="50%">
        <mj-button background-color="#73C8A9" color="#373B44" font-size="14px" align="center" font-weight="bold" border="none" padding="15px 30px" border-radius="10px" href="${paypalLink}" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="10px">Bei Paypal bezahlen</mj-button>
      </mj-column>
      <mj-column width="50%">
        <mj-button background-color="#73C8A9" color="#373B44" font-size="14px" align="center" font-weight="bold" border="none" padding="15px 30px" border-radius="10px" href="${eventLink}" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="12px">Zusagen / Absagen</mj-button>
      </mj-column>
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
