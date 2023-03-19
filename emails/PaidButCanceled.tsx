import { Body, Head, Hr, Preview, Text } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '../prisma/generated/client'
import { ContainerBox } from './components/ContainerBox'

export const PaidButCanceled = ({
  event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
  userName,
  participantName,
}: {
  event: Partial<Event>
  userName: string
  participantName: string
}) => {
  return (
    <Tailwind>
      <Head />
      <Preview>{`${participantName} hat abgesagt und bezahlt.`}</Preview>
      <Body className="bg-white text-black font-sans">
        <ContainerBox>
          <Text>Hi {userName},</Text>

          <Text>Jemand hat bezahlt, aber abgesagt.</Text>
          <Hr />
          <Text>Zu folgendem Event:</Text>

          <EventTemplate event={event} />

          <Text>{participantName} hat das Event bezahlt aber abgesagt.</Text>
          <Footer />
        </ContainerBox>
      </Body>
    </Tailwind>
  )
}

export default PaidButCanceled
