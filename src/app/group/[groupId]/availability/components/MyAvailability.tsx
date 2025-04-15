"use client"

import { TimeSlotEditor } from "@/src/components/TimeSlotEditor"
import { Calendar } from "@/ui/calendar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import type { TimeSlot } from "@prisma/client"
import { useQueryState } from "nuqs"
import { revalidateGroupAction } from "../../actions"

interface MyAvailabilityProps {
	groupId: string
	initialWeekdaySlots: Array<TimeSlot>
	initialWeekendSlots: Array<TimeSlot>
	initialDaySpecificSlots: Array<TimeSlot>
}

export function MyAvailability({
	groupId,
	initialWeekdaySlots,
	initialWeekendSlots,
	initialDaySpecificSlots,
}: MyAvailabilityProps) {
	const [date, setDate] = useQueryState("selectedDate", {
		defaultValue: new Date().toISOString(),
	})

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (newDate) {
			await setDate(newDate.toISOString())

			await revalidateGroupAction({
				groupId,
			})
		}
	}

	return (
		<div className="container mx-auto space-y-8">
			<Tabs defaultValue="general" className="w-full flex flex-col">
				<TabsList className="grid w-fit grid-cols-2 self-center">
					<TabsTrigger value="general">Allgemeine Verfügbarkeit</TabsTrigger>
					<TabsTrigger value="specific">Tagspezifisch</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Werktags-Verfügbarkeit</CardTitle>
								<CardDescription>
									Lege deine allgemeine Verfügbarkeit für Werktage fest
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TimeSlotEditor
									timeSlots={initialWeekdaySlots}
									groupId={groupId}
									type="GENERAL"
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Wochenend-Verfügbarkeit</CardTitle>
								<CardDescription>
									Lege deine allgemeine Verfügbarkeit für Wochenenden fest
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TimeSlotEditor
									timeSlots={initialWeekendSlots}
									groupId={groupId}
									type="WEEKEND"
								/>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="specific" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Tagesspezifische Verfügbarkeit</CardTitle>
							<CardDescription>
								Lege deine Verfügbarkeit für bestimmte Tage fest
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-[300px_1fr]">
							<div className="rounded-lg border p-4">
								<Calendar
									mode="single"
									selected={date ? new Date(date) : undefined}
									onSelect={handleDateSelect}
									className="mx-auto"
								/>
							</div>

							{date ? (
								<div>
									<h3 className="mb-4 font-medium">
										{new Date(date).toLocaleDateString("de-DE", {
											weekday: "long",
											month: "long",
											day: "numeric",
										})}
									</h3>
									<TimeSlotEditor
										timeSlots={initialDaySpecificSlots ?? []}
										groupId={groupId}
										date={new Date(date)}
										type="DAY_SPECIFIC"
									/>
								</div>
							) : (
								<div className="flex items-center justify-center text-muted-foreground">
									Wähle ein Datum aus, um die spezifische Verfügbarkeit
									festzulegen
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
