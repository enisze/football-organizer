import {
  Body,
  Container,
  Head,
  Hr,
  Preview,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '../prisma/generated/client'

export const PaidButCanceled = ({
  event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
  link,
  userName,
  participantName,
}: {
  event: Partial<Event>
  link: string
  userName: string
  participantName: string
}) => {
  return (
    <Tailwind>
      <Head />
      <Preview>The platform to organize your events magically.</Preview>
      <Body className="bg-white text-black font-serif">
        <Container>
          <Text>Hi {userName},</Text>

          <Text>Jemand hat bezahlt, aber abgesagt.</Text>
          <Hr />
          <Text>Zu folgendem Event:</Text>

          <EventTemplate event={event} />

          <Container>
            <Text>{participantName} hat das Event bezahlt aber abgesagt.</Text>
            <Footer />
          </Container>
        </Container>
      </Body>
    </Tailwind>
  )
}

export default PaidButCanceled
