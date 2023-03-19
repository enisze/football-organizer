import { Column } from '@react-email/column'
import { Row } from '@react-email/row'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import type { Event } from '../../prisma/generated/client'
import { transformDate } from '../helpers/transformDate'

export const EventTemplate = ({ event }: { event: Partial<Event> }) => {
  const {
    address = 'unbekannt',
    cost = 10,
    date = new Date(),
    endTime = '21:30',
    startTime = '20:00',
    maxParticipants = 10,
  } = event

  return (
    <Section className="bg-gray-200 p-4 rounded">
      <Row>
        <Column>
          Ort
          <Text>{address}</Text>
        </Column>
        <Column>
          Datum
          <Text>{date ? transformDate(date) : 'Unbekannt'}</Text>
        </Column>
        <Column>
          Uhrzeit
          <Text>
            {startTime} - {endTime} Uhr
          </Text>
        </Column>
        <Column>
          Preis
          <Text>{cost && cost / (maxParticipants ?? 10)} Euro</Text>
        </Column>
      </Row>
    </Section>
  )
}
