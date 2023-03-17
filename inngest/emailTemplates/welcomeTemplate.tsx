import compileMjml from 'mjml'
import { getFAQTemplate } from './helpers/faqTemplate'

export const generateWelcomeTemplate = ({ userName }: { userName: string }) => {
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
        Du hast dich erfolgreich registriert. </span>
          <br />
          <span style="font-size:15px">Kurz ein Überblick über die Funktionalitäten:</span>
        </mj-text>
      </mj-column>
    </mj-section>
    ${getFAQTemplate()}
    <mj-section background-color="#1E293B" padding-bottom="20px" padding-top="20px">
      <mj-column>
        <mj-text align="center" color="#FFF" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px">
        <span style="font-size:20px; font-weight:bold">
        Falls du noch weitere Fragen haben solltest oder etwas unklar ist, meld dich bei mir :). Feedback bzgl. UX / Design ist auch herzlichst willkommen.
        </span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#1E293B" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-divider border-color="#ffffff" border-width="2px" border-style="solid" padding-left="20px" padding-right="20px" padding-bottom="0px" padding-top="0"></mj-divider>
        <mj-text align="center" color="#FFF" font-size="15px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="20px">Liebe Grüße,
          <br />
          <span style="font-size:15px">Das Event Wizard Team </span>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `)
  return html
}
