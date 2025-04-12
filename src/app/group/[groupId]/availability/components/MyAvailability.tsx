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
import type { TimeSlot, User } from "@prisma/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getTimeSlotsAction } from "../actions"

interface MyAvailabilityProps {
	groupId: string
	users: User[]
	initialWeekdaySlots: Array<Pick<TimeSlot, "startTime" | "endTime">>
	initialWeekendSlots: Array<Pick<TimeSlot, "startTime" | "endTime">>
}

export function MyAvailability({
	groupId,
	users,
	initialWeekdaySlots,
	initialWeekendSlots,
}: MyAvailabilityProps) {
	const [date, setDate] = useState<Date>()
	const queryClient = useQueryClient()

	const { data: daySpecificSlots } = useQuery({
		queryKey: ["daySpecificSlots", groupId, date],
		queryFn: async () => {
			if (!date) {
				const result = await getTimeSlotsAction({ groupId, date: new Date() })
				return result?.data
			}
			const result = await getTimeSlotsAction({ groupId, date })
			return result?.data
		},
		enabled: Boolean(date),
	})

	const handleDateSelect = (newDate: Date | undefined) => {
		setDate(newDate)
		if (newDate) {
			queryClient.invalidateQueries({
				queryKey: ["daySpecificSlots", groupId, newDate],
			})
		}
	}

	return (
		<div className="container mx-auto space-y-8 p-4">
			<Tabs defaultValue="general" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="general">General Availability</TabsTrigger>
					<TabsTrigger value="specific">Day-Specific</TabsTrigger>
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
									maxSlots={2}
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
									maxSlots={2}
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
									selected={date}
									onSelect={handleDateSelect}
									className="mx-auto"
								/>
							</div>

							{date ? (
								<div>
									<h3 className="mb-4 font-medium">
										{date.toLocaleDateString("de-DE", {
											weekday: "long",
											month: "long",
											day: "numeric",
										})}
									</h3>
									<TimeSlotEditor
										timeSlots={daySpecificSlots ?? []}
										maxSlots={2}
										groupId={groupId}
										date={date}
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
