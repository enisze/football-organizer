"use client"

import { AvailabilityEditor } from "@/src/components/AvailabilityEditor"
import { Calendar } from "@/ui/calendar"
import type { UserAvailability } from "@prisma/client"
import { useQueryState } from "nuqs"
import { revalidateGroupAction } from "./actions"

interface MyAvailabilityPageProps {
	groupId: string
	availability: UserAvailability | null
}

export default function MyAvailabilityPage({
	groupId,
	availability,
}: MyAvailabilityPageProps) {
	const [date, setDate] = useQueryState("date", {
		defaultValue: "",
	})

	const isWeekend = (date: Date) => {
		const day = date.getDay()
		return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
	}

	return (
		<div className="container mx-auto py-6">
			<div className="mb-6 flex items-center">
				<h1 className="ml-4 text-2xl font-bold">Meine Verfügbarkeit</h1>
			</div>

			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<div className="rounded-lg border p-4">
						<Calendar
							mode="single"
							selected={new Date(date)}
							onSelect={async (date) => {
								setDate(date?.toISOString() || "")
								await revalidateGroupAction()
							}}
							className="mx-auto"
						/>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="mb-2 font-medium">Anleitung</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>• Wählen Sie ein Datum im Kalender</li>
							<li>
								• Klicken und ziehen Sie, um verfügbare Zeiten festzulegen
							</li>
							<li>• Werktags: 18:00-23:00 verfügbar</li>
							<li>• Wochenende: 10:00-23:00 verfügbar</li>
						</ul>
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h2 className="mb-4 text-xl font-semibold">
						{date ? (
							<>
								{new Date(date).toLocaleDateString("de-DE", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})}
								<span className="ml-2 text-sm font-normal text-muted-foreground">
									{isWeekend(new Date(date)) ? "(Wochenende)" : "(Werktag)"}
								</span>
							</>
						) : (
							"Datum auswählen"
						)}
					</h2>

					{date && (
						<AvailabilityEditor
							date={new Date(date)}
							isWeekend={isWeekend(new Date(date))}
							groupId={groupId}
							availability={availability}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
