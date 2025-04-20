'use client'

import { TimeSlotEditor } from '@/src/components/TimeSlotEditor'
import { Calendar } from '@/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import type { TimeSlot } from '@prisma/client'
import { useQueryState } from 'nuqs'
import { revalidateGroupAction } from '../../actions'

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
	const [date, setDate] = useQueryState('selectedDate', {
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
			<h2 className="text-3xl font-bold mb-4 text-center">
				Meine Verfügbarkeit
			</h2>
			<Tabs defaultValue="general" className="w-full flex flex-col">
				<TabsList className="inline-flex rounded-xl bg-white/5 p-1 self-center">
					<TabsTrigger
						value="general"
						className="px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5"
					>
						Allgemeine Verfügbarkeit
					</TabsTrigger>
					<TabsTrigger
						value="specific"
						className="px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5"
					>
						Tagspezifisch
					</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<div className="grid gap-6 md:grid-cols-2">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-2xl">
									Werktags-Verfügbarkeit
								</CardTitle>
								<CardDescription className="text-white/70">
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

						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-2xl">
									Wochenend-Verfügbarkeit
								</CardTitle>
								<CardDescription className="text-white/70">
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
					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardHeader>
							<CardTitle className="text-2xl">
								Tagesspezifische Verfügbarkeit
							</CardTitle>
							<CardDescription className="text-white/70">
								Lege deine Verfügbarkeit für bestimmte Tage fest
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-[300px_1fr]">
							<div className="bg-white/5 rounded-xl p-4">
								<Calendar
									mode="single"
									selected={date ? new Date(date) : undefined}
									onSelect={handleDateSelect}
									className="mx-auto"
								/>
							</div>

							{date ? (
								<div className="space-y-4">
									<h3 className="text-lg font-medium">
										{new Date(date).toLocaleDateString('de-DE', {
											weekday: 'long',
											month: 'long',
											day: 'numeric',
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
								<div className="flex items-center justify-center text-white/70">
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
