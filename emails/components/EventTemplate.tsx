import { Column } from '@react-email/column'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import type { Event } from '../../prisma/generated/client'
import { transformDate } from '../helpers/transformDate'

export const EventTemplate = (event: Partial<Event>) => {
  const {
    address = 'unbekannt',
    cost = 10,
    date = new Date(),
    endTime = '21:30',
    startTime = '20:00',
    maxParticipants = 10,
  } = event

  return (
    <Section>
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
        <Text>{cost && cost / (maxParticipants ?? 10)}</Text>
      </Column>
    </Section>
  )
}
