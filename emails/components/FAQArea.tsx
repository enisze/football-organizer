import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

export const FAQArea = () => {
  const texts = [
    '1. Du kannst in der Applikation zu Events zu- und absagen.',
    '1.1 Sagst du zu einem Event zu. Erhältst du Erinnerungs-Emails bzgl Bezahlung. Ich bitte dich die Fristen einzuhalten und <strong>nur über PayPal</strong> zu bezahlen. Der zu zahlende Betrag steht bei jedem Event dabei.',
    '1.2 Sagst du zu einem Event ab. Erhältst du gar keine Erinnerungsmails mehr.',
    '2. Grundsätzlich erhält jeder, Erinnerungs-Emails zu einem Event, falls noch Plätze frei sind. Diese werden von mir getriggert. Falls du explizit auf <strong>Absagen</strong> geklickt hast, erhältst du keine mehr.',
    '3. Du kannst alle E-Mail Benachrichtigungen oben Rechts im Dropdown Menü ausschalten. Wenn du dies tust erhältst du gar keine E-Mails mehr.',
    '4. Du kannst in der Applikation zu jedem Event Ort, Datum, Uhrzeit, die Teilnehmer und die Absagen sehen.',
    '5. Du kannst in der Applikation deinen aktuellen Kontostand sehen, wenn du oben rechts auf deinen Namen klickst. Dieser wird anhand deiner Aktionen in der Webapp entsprechend berechnet.',
  ]
  return (
    <Section>
      {texts.map((text, index) => {
        return <Text key={index}>{text}</Text>
      })}
    </Section>
  )
}
