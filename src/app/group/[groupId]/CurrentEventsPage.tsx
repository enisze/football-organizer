import { MobileEventCard } from '@/src/components/Events/MobileEventCard'
import { prisma } from '@/src/server/db/client'
import { addDays } from 'date-fns'
import { EventDialog } from '../../settings/groups/[groupId]/EventDialog'
import { getLatLong } from './getLatLong'

interface CurrentEventsPageProps {
	groupId: string
	userId: string
	isOwner: boolean
}

export async function CurrentEventsPage({
	groupId,
	userId,
	isOwner,
}: CurrentEventsPageProps) {
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
			<div className="flex justify-between w-full">
				<h2 className="text-2xl font-bold">Events</h2>
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
								userId,
							},
						})
						if (addDays(event.date, 3) < new Date() && !isOwner && payment)
							return null

						return (
							<li key={event.id}>
								<MobileEventCard
									event={event}
									location={data?.get(event.id)}
									userId={userId}
								/>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
