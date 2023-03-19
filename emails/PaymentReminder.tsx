import {
  Body,
  Container,
  Head,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '../prisma/generated/client'
import { CustomButton } from './components/CustomButton'
import { paypalLink } from './helpers/constants'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const PaymentReminder = ({
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
          <Section className="text-center pt-4">
            <CustomButton href={paypalLink}>Bei Paypal bezahlen</CustomButton>
          </Section>

          <Container>
            <Text>
              Es kann bis zu 24 Stunden dauern, bis die Zahlung registriert
              wird.
            </Text>
            <Text>
              {`Falls du schon bezahlt hast, kannst du diese Mail ignorieren :)`}
            </Text>
            <Footer />
          </Container>
        </Container>
      </Body>
    </Tailwind>
  )
}

export default PaymentReminder
