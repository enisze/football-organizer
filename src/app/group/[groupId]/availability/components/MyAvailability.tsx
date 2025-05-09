'use client'

import { WeeklyAvailabilityEditor } from '@/src/app/group/[groupId]/availability/components/WeeklyAvailabilityEditor'
import { DateSpecificEditor } from '@/src/components/DateSpecificEditor'
import { ExceptionsEditor } from '@/src/components/ExceptionsEditor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import type { TimeSlot } from '@prisma/client'
import { useTour } from '@reactour/tour'
import { useQueryState } from 'nuqs'

interface MyAvailabilityProps {
	groupId: string
	initialDaySpecificSlots: Array<TimeSlot>
	initialWeeklySlots: Record<number, TimeSlot[]>
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
	const [selectedTab, setSelectedTab] = useQueryState('tab', {
		defaultValue: tab,
	})

	const { setCurrentStep } = useTour()

	return (
		<div className='container px-4 mx-auto space-y-8 pt-2'>
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
						timeSlots={initialWeeklySlots}
						groupId={groupId}
					/>
				</TabsContent>

				<TabsContent value='exception' className='space-y-4'>
					<ExceptionsEditor groupId={groupId} exceptionSlots={exceptionSlots} />
				</TabsContent>

				<TabsContent value='date' className='space-y-2 pb-20'>
					<DateSpecificEditor
						initialDaySpecificSlots={initialDaySpecificSlots}
						groupId={groupId}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
