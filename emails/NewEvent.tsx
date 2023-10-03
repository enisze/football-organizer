import { Body, Head, Preview, Section, Text } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { CustomButton } from './components/CustomButton'
import { EventTemplate } from './components/EventTemplate'
import { Footer } from './components/Footer'

import type { Event } from '../prisma/generated/client'
import { ContainerBox } from './components/ContainerBox'

export const NewEvent = ({
  event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
  userName = 'Test',
}: {
  event: Partial<Omit<Event, 'createdAt' | 'updatedAt'>>
  userName: string
}) => {
  const { id } = event
  const eventLink = process.env.NEXT_PUBLIC_BASE_URL + '/events/' + id

  return (
    <Tailwind>
      <Head />
      <Preview>Neues Event, dein Status wird benötigt.</Preview>
      <Body className="bg-white text-black font-sans">
        <ContainerBox>
          <Text>Hi {userName},</Text>
          <Text>Ein neues Event wurde erstellt.</Text>
          <Text>Es findet voraussichtlich zu den Daten statt:</Text>
          <EventTemplate event={event} />

          <Section className="text-center pt-4">
            <CustomButton href={eventLink} className="justify-center">
              Zusagen / Absagen
            </CustomButton>
          </Section>
          <Footer />
        </ContainerBox>
      </Body>
    </Tailwind>
  )
}

export default NewEvent
