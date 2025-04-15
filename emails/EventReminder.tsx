import { Body, Column, Head, Preview, Row, Text } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { CustomButton } from './components/CustomButton'
import { Footer } from './components/Footer'

import type { Event } from '@prisma/client'
import { ContainerBox } from './components/ContainerBox'
import { EventTemplate } from './components/EventTemplate'
import { paypalLink } from './helpers/constants'

export const EventReminder = ({
	event = { id: '1', bookingDate: new Date(), maxParticipants: 10 },
	userName = 'Test',
	participantsAmount = 0,
}: {
	event: Partial<Omit<Event, 'createdAt' | 'updatedAt'>>
	userName: string
	participantsAmount: number
}) => {
	const { id, date } = event
	const eventLink = process.env.NEXT_PUBLIC_BASE_URL + '/events/' + id

	return (
		<Tailwind>
			<Head />
			<Preview>
				{`Noch ${
					(event.maxParticipants ?? 10) - participantsAmount
				} freie Plätze am ${date?.toLocaleDateString()}
          `}
			</Preview>
			<Body className="bg-white text-black font-sans">
				<ContainerBox className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
					<Text>Hi {userName},</Text>
					<Text>
						Ein Event zu dem du weder zu- noch abgesagt hast steht noch an.
					</Text>
					<Text>
						Es sind noch {(event.maxParticipants ?? 10) - participantsAmount}{' '}
						Plätze frei.
					</Text>
					<EventTemplate event={event} />

					<Row className="pt-4 text-center">
						<Column>
							<CustomButton href={paypalLink}>Bei Paypal bezahlen</CustomButton>
						</Column>
						<Column>
							<CustomButton href={eventLink}>Zusagen / Absagen</CustomButton>
						</Column>
					</Row>

					<Footer />
				</ContainerBox>
			</Body>
		</Tailwind>
	)
}

export default EventReminder
