import {
  Body,
  Column,
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
import { paypalLink } from './helpers/constants'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const EventReminder = ({
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
      <Body className="bg-slate-900 text-white font-serif">
        <Container>
          <Text>Hi {userName},</Text>
          <Text>
            Ein Event zu dem du weder zu- noch abgesagt hast steht noch an.
          </Text>
          <Text>
            Es sind noch {(event.maxParticipants ?? 10) - participantsAmount}{' '}
            Plätze frei.
          </Text>
          <EventTemplate />
          <Section className="text-center">
            <Column>
              <CustomButton href={paypalLink} className="justify-center">
                Bei Paypal bezahlen
              </CustomButton>
            </Column>
            <Column>
              <CustomButton href={eventLink} className="justify-center">
                Hier gehts zum Event
              </CustomButton>
            </Column>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Tailwind>
  )
}

export default EventReminder
