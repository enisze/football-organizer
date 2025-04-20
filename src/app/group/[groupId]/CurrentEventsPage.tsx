import { EventCard } from '@/src/components/Events/EventCard'
import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { addDays } from 'date-fns'
import { Suspense } from 'react'
import { EventDialog } from '../../settings/groups/[groupId]/EventDialog'
import { getLatLong } from './getLatLong'

interface CurrentEventsPageProps {
	groupId: string
}

async function EventsList({ groupId }: CurrentEventsPageProps) {
	const session = await serverAuth()
	const isOwner = await isOwnerOfGroup(groupId)

	const events = await prisma.event.findMany({
		where: { groupId },
		orderBy: { date: 'asc' },
	})

	const eventInfo = events.map((event) => ({
		address: event.address,
		id: event.id,
	}))

	const data = eventInfo.length > 0 ? await getLatLong(eventInfo) : new Map()

	return (
		<div className="m-8 flex flex-col gap-y-3 justify-center items-center">
			<div className="flex flex-col">
				<h2 className="text-3xl font-bold mb-4 ">Aktuelle Events</h2>
				{isOwner && <EventDialog />}
			</div>
			{events.length === 0 ? (
				<div className="text-gray-500 text-center">
					<p>Momentan gibt es keine Events.</p>
				</div>
			) : (
				<ul className="flex flex-col gap-y-2">
					{events.map(async (event) => {
						const payment = await prisma.payment.findFirst({
							where: {
								eventId: event.id,
								userId: session?.user?.id ?? '',
							},
						})
						if (addDays(event.date, 3) < new Date() && !isOwner && payment)
							return null

						return (
							<li key={event.id}>
								<EventCard event={event} location={data?.get(event.id)} />
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default function CurrentEventsPage({ groupId }: CurrentEventsPageProps) {
	return (
		<Suspense fallback={<div>Loading events...</div>}>
			<EventsList groupId={groupId} />
		</Suspense>
	)
}
