import { EventCard } from "@/src/components/Events/EventCard"
import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { prisma } from "@/src/server/db/client"
import { routes } from "@/src/shared/navigation"
import { OrganizerLink } from "@/ui/OrganizerLink"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLatLong } from "../../group/[groupId]/getLatLong"
import { StatusButton } from "./StatusButton"

interface PageProps {
	params: Promise<unknown>
}

const EventPage = async ({ params }: PageProps) => {
	const resolvedParams = await params
	const { eventId } = routes.event.$parseParams(resolvedParams)
	const session = await getServerComponentAuthSession()

	if (!session || !session.user?.id) {
		// redirect('/api/auth/signin', RedirectType.push)
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
		<div className="flex flex-col items-center gap-y-3">
			<EventCard event={event} location={data?.get(event.id)} />
			<StatusButton eventId={eventId} />

			<Link href={routes.group()}>
				<span>Zur Startseite</span>
			</Link>
			<OrganizerLink href={routes.groupDetails({ groupId: event.groupId })}>
				<div>Zurück zur Gruppe</div>
			</OrganizerLink>
		</div>
	)
}

export default EventPage
