import {
  Body,
  Container,
  Head,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { CustomButton } from './components/CustomButton'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '../prisma/generated/client'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const NewEvent = ({
  event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
  userName = 'Test',
  participantsAmount = 0,
}: {
  event: Partial<Event>
  userName: string
  participantsAmount: number
}) => {
  const { id, bookingDate } = event
  const eventLink = process.env.NEXT_PUBLIC_BASE_URL + '/events/' + id

  return (
    <Tailwind>
      <Head />
      <Preview>The platform to organize your events magically.</Preview>
      <Body className="bg-white text-black font-serif">
        <Container>
          <Text>Hi {userName},</Text>
          <Text>Ein neues Event wurde erstellt.</Text>
          <Text>Es findet voraussichtlich zu den Daten statt:</Text>
          <EventTemplate event={event} />

          <Container className="pt-4">
            <Section className="text-center">
              <CustomButton href={eventLink} className="justify-center">
                Zusagen / Absagen
              </CustomButton>
            </Section>
            <Footer />
          </Container>
        </Container>
      </Body>
    </Tailwind>
  )
}

export default NewEvent
