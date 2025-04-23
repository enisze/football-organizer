import { EventDetailsCard } from '@/src/components/Events/EventDetailsCard'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { notFound, redirect } from 'next/navigation'
import { getLatLong } from '../../group/[groupId]/getLatLong'
import { NotificationStatusButton } from './NotificationStatusButton'

interface PageProps {
	params: Promise<unknown>
}

const EventPage = async ({ params }: PageProps) => {
	const resolvedParams = await params
	const { eventId } = routes.event.$parseParams(resolvedParams)
	const session = await serverAuth()

	if (!session || !session.user?.id) {
		redirect(routes.signIn())
	}

	const event = await prisma.event.findUnique({
		where: {
			id: eventId,
		},
	})

	if (!event) {
		notFound()
	}

	const data = await getLatLong([{ address: event.address, id: event.id }])

	return (
		<div className='flex flex-col items-center gap-y-3 pt-4 container mx-auto'>
			<EventDetailsCard event={event} location={data?.get(event.id)} />

			<NotificationStatusButton eventId={eventId} />
			<div className='flex gap-1 mt-8 text-center space-y-2'>
				<div className='text-sm text-gray-500'>
					<OrganizerLink href={routes.group()}>Zur Startseite</OrganizerLink>
					<OrganizerLink href={routes.groupDetails({ groupId: event.groupId })}>
						Zurück zur Gruppe
					</OrganizerLink>
				</div>
			</div>
		</div>
	)
}

export default EventPage
