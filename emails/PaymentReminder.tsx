import { Body, Head, Preview, Section, Text } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '@prisma/client'
import { ContainerBox } from './components/ContainerBox'
import { CustomButton } from './components/CustomButton'

type PaymentReminderProps = {
  event: Partial<Omit<Event, 'createdAt' | 'updatedAt'>>
  userName: string
}

export const PaymentReminder = ({
  event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
  userName = 'Test',
}: PaymentReminderProps) => {
  const { id } = event
  const eventLink = process.env.NEXT_PUBLIC_BASE_URL + '/events/' + id

  return (
    <Tailwind>
      <Head />
      <Preview>Deine Bezahlung steht aus.</Preview>
      <Body className="bg-white text-black font-sans">
        <ContainerBox>
          <Text>Hi {userName},</Text>
          <Text>Ein neues Event wurde erstellt.</Text>
          <Text>Es findet voraussichtlich zu den Daten statt:</Text>
          <EventTemplate event={event} />
          <Section className="text-center pt-4">
            <CustomButton href={eventLink}>Zusagen / Absagen</CustomButton>
          </Section>

          <Text>
            Es kann bis zu 24 Stunden dauern, bis die Zahlung registriert wird.
          </Text>
          <Text>
            {`Falls du schon bezahlt hast, kannst du diese Mail ignorieren :)`}
          </Text>
          <Footer />
        </ContainerBox>
      </Body>
    </Tailwind>
  )
}

export default PaymentReminder
