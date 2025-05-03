'use client'

import { ExceptionsEditor } from '@/src/components/ExceptionsEditor'
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
import { revalidateTagAction } from '../../actions'

interface MyAvailabilityProps {
	groupId: string
	initialDaySpecificSlots: Array<TimeSlot>
	initialWeeklySlots: Array<TimeSlot>
	exceptionSlots: Array<TimeSlot>
	tab: string
}

export function MyAvailability({
	groupId,
	initialDaySpecificSlots,
	initialWeeklySlots,
	exceptionSlots,
	tab,
}: MyAvailabilityProps) {
	const [date, setDate] = useQueryState('selectedDate', {
		defaultValue: new Date().toISOString(),
	})

	const [selectedTab, setSelectedTab] = useQueryState('tab', {
		defaultValue: tab,
	})

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (newDate) {
			await setDate(newDate.toISOString())
			await revalidateTagAction({
				tagId: 'myAvailability',
			})
			await revalidateTagAction({
				tagId: 'groupAvailability',
			})
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
			<Tabs
				defaultValue={selectedTab}
				onValueChange={setSelectedTab}
				className='w-full flex flex-col'
			>
				<TabsList className='inline-flex rounded-xl bg-white/5 p-1 self-center'>
					<TabsTrigger
						value='date'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='date'
					>
						Täglich
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
						value='exception'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='exception'
					>
						Ausnahmen
					</TabsTrigger>
				</TabsList>

				<TabsContent value='weekly' className='space-y-4'>
					<WeeklyAvailabilityEditor
						timeSlots={weeklySlotsByDay}
						groupId={groupId}
					/>
				</TabsContent>

				<TabsContent value='exception' className='space-y-4'>
					<ExceptionsEditor groupId={groupId} exceptionSlots={exceptionSlots} />
				</TabsContent>

				<TabsContent value='date' className='space-y-4'>
					<Card className='bg-white/5 backdrop-blur-sm'>
						<CardHeader className='pb-2'>
							<CardTitle className='flex text-lg items-center gap-2'>
								<Clock className='h-6 w-6 flex-none' />
								Datumsspezifische Verfügbarkeit
							</CardTitle>
							<CardDescription className='text-white/70'>
								Lege deine Verfügbarkeit für bestimmte Tage fest
							</CardDescription>
						</CardHeader>
						<CardContent className='grid gap-2 md:grid-cols-[300px_1fr]'>
							<div className='bg-white/5 rounded-xl p-4'>
								<Calendar
									mode='single'
									selected={date ? new Date(date) : undefined}
									onSelect={handleDateSelect}
									className='mx-auto'
								/>
							</div>

							{date ? (
								<div className='space-y-2'>
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
