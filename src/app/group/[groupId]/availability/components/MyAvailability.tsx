'use client'

import { TimeSlotEditor } from '@/src/components/TimeSlotEditor'
import { WeeklyAvailabilityEditor } from '@/src/components/WeeklyAvailabilityEditor'
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
import { useTour } from '@reactour/tour'
import { Clock } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { groupBy } from 'remeda'
import { revalidateGroupAction, revalidateTagAction } from '../../actions'

interface MyAvailabilityProps {
	groupId: string
	initialWeekdaySlots: Array<TimeSlot>
	initialWeekendSlots: Array<TimeSlot>
	initialDaySpecificSlots: Array<TimeSlot>
	initialWeeklySlots: Array<TimeSlot>
}

export function MyAvailability({
	groupId,
	initialWeekdaySlots,
	initialWeekendSlots,
	initialDaySpecificSlots,
	initialWeeklySlots,
}: MyAvailabilityProps) {
	const [date, setDate] = useQueryState('selectedDate', {
		defaultValue: new Date().toISOString(),
	})

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (newDate) {
			await setDate(newDate.toISOString())
			await revalidateTagAction({
				tagId: 'myAvailability',
			})
			await revalidateGroupAction({ groupId })
		}
	}

	const weeklySlotsByDay = groupBy(
		initialWeeklySlots.filter(
			(slot): slot is TimeSlot & { day: number } => slot.day !== null,
		),
		(slot) => slot.day,
	)

	const { setCurrentStep } = useTour()

	return (
		<div className='container px-4 mx-auto space-y-8 pt-2 pb-20'>
			<h2 className='text-2xl font-bold -mb-4'>Meine Zeiten</h2>
			<Tabs defaultValue='weekly' className='w-full flex flex-col'>
				<TabsList className='inline-flex rounded-xl bg-white/5 p-1 self-center'>
					<TabsTrigger
						value='general'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='general'
					>
						Allgemein
					</TabsTrigger>
					<TabsTrigger
						value='weekly'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='weekly'
						onClick={() => {
							setCurrentStep((prev) => prev + 1)
						}}
					>
						Wöchentlich
					</TabsTrigger>
					<TabsTrigger
						value='date'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='date'
					>
						Täglich
					</TabsTrigger>
				</TabsList>

				<TabsContent value='general' className='space-y-4'>
					<div className='grid gap-6 md:grid-cols-2'>
						<Card
							className='bg-white/5 backdrop-blur-sm border-white/10'
							data-section='weekday-availability'
						>
							<CardHeader>
								<CardTitle className='text-lg flex items-center gap-2'>
									<Clock className='h-4 w-4 ' />
									Werktags-Verfügbarkeit
								</CardTitle>
								<CardDescription className='text-white/70'>
									Lege deine allgemeine Verfügbarkeit für Werktage fest
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TimeSlotEditor
									timeSlots={initialWeekdaySlots}
									groupId={groupId}
									type='GENERAL'
								/>
							</CardContent>
						</Card>

						<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
							<CardHeader>
								<CardTitle className='text-lg flex items-center gap-2'>
									<Clock className='h-4 w-4 flex-none' />
									Wochenend-Verfügbarkeit
								</CardTitle>
								<CardDescription className='text-white/70'>
									Lege deine allgemeine Verfügbarkeit für Wochenenden fest
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TimeSlotEditor
									timeSlots={initialWeekendSlots}
									groupId={groupId}
									type='WEEKEND'
								/>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value='weekly' className='space-y-4'>
					<WeeklyAvailabilityEditor
						timeSlots={weeklySlotsByDay}
						groupId={groupId}
					/>
				</TabsContent>

				<TabsContent value='date' className='space-y-4'>
					<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
						<CardHeader>
							<CardTitle className='text-lg flex items-center gap-2'>
								<Clock className='h-4 w-4 flex-none' />
								Datumsspezifische Verfügbarkeit
							</CardTitle>
							<CardDescription className='text-white/70'>
								Lege deine Verfügbarkeit für bestimmte Tage fest
							</CardDescription>
						</CardHeader>
						<CardContent className='grid gap-6 md:grid-cols-[300px_1fr]'>
							<div className='bg-white/5 rounded-xl p-4'>
								<Calendar
									mode='single'
									selected={date ? new Date(date) : undefined}
									onSelect={handleDateSelect}
									className='mx-auto'
								/>
							</div>

							{date ? (
								<div className='space-y-4'>
									<h3 className='text-lg font-medium'>
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
										type='DATE_SPECIFIC'
									/>
								</div>
							) : (
								<div className='flex items-center justify-center text-white/70'>
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
