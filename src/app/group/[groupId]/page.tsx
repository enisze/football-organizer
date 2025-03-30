import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { redirect } from 'next/navigation'
import { getLatLong } from './getLatLong'

import { EventCard } from '@/src/components/Events/EventCard'
import { prisma } from '@/src/server/db/client'
import { redis } from '@/src/server/db/redis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { addDays } from 'date-fns'
import GroupAvailabilityPage from './GroupPage'
import MyAvailabilityPage from './MyAvailability'

const MainPage = async ({
	params: { groupId }
}: {
	params: { groupId: string }
}) => {
	const isOwner = await isOwnerOfGroup()
	const events = await prisma.event.findMany({
		where: {
			groupId
		},
		orderBy: { date: 'asc' }
	})

	const eventInfo = events.map((event) => {
		return { address: event.address, id: event.id }
	})

	const data = await getLatLong(eventInfo)

	if (redis.isOpen) {
		await redis.disconnect()
	}

	const session = await getServerComponentAuthSession()

	if (!session?.user?.id) redirect('/api/auth/signin')

	const isInGroup = await prisma.userOnGroups.findFirst({
		where: {
			groupId,
			id: session?.user?.id
		}
	})

	if (!isInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

	return (
		<div className='flex flex-col pb-2'>
			<Tabs defaultValue='events' className='w-full'>
				<TabsList className='w-full'>
					<TabsTrigger value='events'>Aktuelle Events</TabsTrigger>
					<TabsTrigger value='myAvailability'>Meine Verfügbarkeit</TabsTrigger>
					<TabsTrigger value='groupAvailability'>
						Gruppenverfügbarkeit
					</TabsTrigger>
				</TabsList>
				<TabsContent value='events'>
					<div className='m-8 flex flex-col gap-y-3 justify-center items-center'>
						<ul className='flex flex-col gap-y-2'>
							{events &&
								events?.length > 0 &&
								events.map(async (event) => {
									const payment = await prisma.payment.findFirst({
										where: { eventId: event.id, userId: session?.user?.id }
									})
									if (
										addDays(event.date, 3) < new Date() &&
										!isOwner &&
										payment
									)
										return null

									return (
										<li key={event.id}>
											<EventCard event={event} location={data?.get(event.id)} />
										</li>
									)
								})}
						</ul>
					</div>
				</TabsContent>
				<TabsContent value='myAvailability'>
					<MyAvailabilityPage />
				</TabsContent>
				<TabsContent value='groupAvailability'>
					<GroupAvailabilityPage />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default MainPage
