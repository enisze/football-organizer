"use client"

import { cn } from "@/lib/utils/cn"
import { Calendar } from "@/ui/calendar"
import { Card, CardContent } from "@/ui/card"
import { Label } from "@/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import type { User } from "@prisma/client"
import { Clock } from "lucide-react"
import { useQueryState } from "nuqs"
import { useCallback } from "react"
import { revalidateGroupAction } from "../app/group/[groupId]/actions"
import type {
	ProcessedTimeSlot,
	TimeSlotDuration,
} from "../app/group/[groupId]/availability/processAvailability"

interface GroupAvailabilityViewProps {
	users: User[]
	date: Date
	processedSlots: ProcessedTimeSlot[]
}

export function GroupAvailabilityView({
	date: initialDate,
	users,
	processedSlots,
}: GroupAvailabilityViewProps) {
	const [date, setDate] = useQueryState("date")
	const [duration, setDuration] = useQueryState("duration", {
		parse: (value) => value as TimeSlotDuration,
	})

	const handleDateChange = useCallback(
		async (newDate: Date | undefined) => {
			if (!newDate) return
			setDate(newDate.toISOString())
			// Add a small delay before revalidating to prevent jumping
			revalidateGroupAction()
		},
		[setDate],
	)

	const currentDate = date ? new Date(date) : initialDate

	return (
		<div className="container mx-auto py-6">
			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<div className="rounded-lg border p-4">
						<div className="mb-2">
							<Label htmlFor="date-picker">Select Date</Label>
							<Calendar
								id="date-picker"
								mode="single"
								selected={currentDate}
								onSelect={handleDateChange}
								className="mx-auto"
							/>
						</div>
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h2 className="mb-4 text-xl font-semibold">
						{currentDate.toLocaleDateString("de-DE", {
							weekday: "long",
							month: "long",
							day: "numeric",
						})}
					</h2>

					<div className="space-y-6">
						<div className="flex flex-col gap-4">
							<div className="flex items-center">
								<Clock className="mr-2 h-5 w-5 text-primary" />
								<h3 className="font-medium">Gruppenverfügbarkeit</h3>
							</div>

							<Tabs
								value={duration ?? undefined}
								onValueChange={(value) =>
									setDuration(value as TimeSlotDuration)
								}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="60min">1 Stunde</TabsTrigger>
									<TabsTrigger value="90min">90 Min</TabsTrigger>
									<TabsTrigger value="120min">2 Stunden</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{processedSlots.map((slot, index) => {
								const availableCount = slot.availableUsers.length
								const percentage =
									users.length > 0 ? (availableCount / users.length) * 100 : 0

								return (
									<Card
										key={index}
										className={cn(
											"relative overflow-hidden",
											percentage === 100 ? "border-green-500" : undefined,
										)}
									>
										<CardContent className="p-4">
											<div className="relative z-10">
												<div className="text-sm font-medium">
													{slot.startTime} - {slot.endTime}
												</div>

												<div className="mt-2 flex flex-wrap gap-2">
													{slot.availableUsers.map((user) => (
														<div
															key={user.id}
															className="flex items-center gap-2 rounded-full border px-2 py-1 text-xs"
														>
															<div className="h-2 w-2 rounded-full bg-primary" />
															{user.name}
														</div>
													))}
												</div>

												<div className="mt-2 text-right text-xs text-muted-foreground">
													{availableCount}/{users.length} verfügbar
												</div>
											</div>

											<div
												className="absolute bottom-0 left-0 right-0 bg-green-500/20"
												style={{
													height: `${percentage}%`,
													opacity: percentage / 100,
												}}
											/>
										</CardContent>
									</Card>
								)
							})}

							{processedSlots.length === 0 && (
								<div className="col-span-full text-center text-muted-foreground">
									Keine verfügbaren Zeitfenster für die gewählte Dauer gefunden
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
