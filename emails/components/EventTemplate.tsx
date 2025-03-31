import { formatter } from "@/src/helpers/formatter"
import type { Event } from "@prisma/client"
import { Section } from "@react-email/components"
import { transformDate } from "../helpers/transformDate"

export const EventTemplate = ({ event }: { event: Partial<Event> }) => {
	const {
		address = "Zuelpicher Str. 49, 50674 Köln ",
		cost = 10,
		date = new Date(),
		endTime = "21:30",
		startTime = "20:00",
		maxParticipants = 10,
	} = event

	return (
		<Section className="bg-gray-200 p-4 rounded">
			<div className="text-start p-1">
				<strong className="pr-2">Ort:</strong>
				{address}
			</div>
			<div className="text-start p-1">
				<strong className="pr-2">Datum:</strong>
				{date ? transformDate(date) : "Unbekannt"}
			</div>
			<div className="text-start p-1">
				<strong className="pr-2">Uhrzeit:</strong>
				{startTime} - {endTime} Uhr
			</div>
			<div className="text-start p-1">
				<strong className="pr-2">Preis:</strong>
				{cost && formatter.format(cost / (maxParticipants ?? 10)) + "€"}
			</div>
		</Section>
	)
}
