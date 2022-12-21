export const getFAQTemplate = () => {
  return `
      <mj-section background-color="#373B44" padding-bottom="15px">
      <mj-column>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-top="28px" padding-left="25px" padding-right="25px"> 
       1. Du kannst in der Applikation zu Events zu- und absagen.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-left="35px" padding-right="25px">
        1.1 Sagst du zu einem Event zu. Erhältst du Erinnerungs-Emails bzgl Bezahlung. Ich bitte dich die Fristen einzuhalten und 
        <strong>nur über PayPal</strong> zu bezahlen. Der zu zahlende Betrag steht bei jedem Event dabei.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" padding="4px" padding-left="35px" padding-right="25px">
        1.2 Sagst du zu einem Event ab. Erhältst du gar keine Erinnerungsmails mehr.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-left="25px" padding-right="25px"">
        2. Grundsätzlich erhält jeder, Erinnerungs-Emails zu einem Event, falls noch Plätze frei sind.
        Diese werden von mir getriggert. Falls du explizit auf <strong>Absagen</strong> geklickt hast, erhältst du keine mehr.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-left="25px" padding-right="25px">
       3. Du kannst in der Applikation zu jedem Event Ort, Datum, Uhrzeit, die Teilnehmer und die Absagen sehen.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-left="25px" padding-right="25px">
       4. Du kannst unter dem Tab <strong>Deine Events</strong> alle Events sehen zu denen du bereits zu- oder abgesagt hast.
        </mj-text>
        <mj-text align="left" color="#FFF" font-family="Helvetica" line-height='18px' padding="4px" padding-bottom="28px" padding-left="25px" padding-right="25px">
       5. Du kannst in der Applikation deinen aktuellen Kontostand sehen, wenn du oben rechts auf deinen Namen klickst. Dieser wird anhand deiner Aktionen in der Webapp entsprechend berechnet.
        </mj-text>
        </mj-column>
    </mj-section>
    `;
};
