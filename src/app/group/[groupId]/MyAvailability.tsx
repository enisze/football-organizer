"use client"

import { Save } from "lucide-react"
import { useState } from "react"

import { AvailabilityEditor } from "@/src/components/AvailabilityEditor"
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import type { UserAvailability } from "@prisma/client"

interface MyAvailabilityPageProps {
	groupId: string
	availabiliies: UserAvailability
}

export default function MyAvailabilityPage({
	groupId,
}: MyAvailabilityPageProps) {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [saved, setSaved] = useState(false)

	const handleSave = () => {
		setSaved(true)
		setTimeout(() => setSaved(false), 2000)
	}

	const isWeekend = (date: Date) => {
		const day = date.getDay()
		return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
	}

	return (
		<div className="container mx-auto py-6">
			<div className="mb-6 flex items-center">
				<h1 className="ml-4 text-2xl font-bold">Meine Verfügbarkeit</h1>
				<div className="ml-auto">
					<Button onClick={handleSave}>
						<Save className="mr-2 h-4 w-4" />
						{saved ? "Gespeichert!" : "Speichern"}
					</Button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<div className="rounded-lg border p-4">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
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
								{date.toLocaleDateString("de-DE", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})}
								<span className="ml-2 text-sm font-normal text-muted-foreground">
									{isWeekend(date!) ? "(Wochenende)" : "(Werktag)"}
								</span>
							</>
						) : (
							"Datum auswählen"
						)}
					</h2>

					{date && (
						<AvailabilityEditor
							date={date}
							isWeekend={isWeekend(date)}
							groupId={groupId}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
