import { TimeSlotEditor } from '@/src/components/TimeSlotEditor'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { CardDescription } from '@/ui/card'
import type { TimeSlot } from '@prisma/client'
import { Clock } from 'lucide-react'

const DAYS = [
	'Montag',
	'Dienstag',
	'Mittwoch',
	'Donnerstag',
	'Freitag',
	'Samstag',
	'Sonntag',
]

interface WeeklyAvailabilityEditorProps {
	timeSlots: Record<number, TimeSlot[]>
	groupId: string
}

export function WeeklyAvailabilityEditor({
	timeSlots,
	groupId,
}: WeeklyAvailabilityEditorProps) {
	return (
		<Accordion type='single' defaultValue='0' className='w-full space-y-2'>
			{DAYS.map((day, index) => (
				<AccordionItem
					key={day}
					value={index.toString()}
					className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg border overflow-hidden'
				>
					<AccordionTrigger className='px-4 py-3 hover:no-underline hover:bg-white/5'>
						<div className='flex items-center gap-2'>
							<Clock className='h-4 w-4' />
							<span className='text-base sm:text-lg'>{day}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className='px-4 pb-4'>
							<CardDescription className='text-white/70 text-sm mb-4'>
								Lege deine Verfügbarkeit für {day} fest
							</CardDescription>
							<TimeSlotEditor
								timeSlots={timeSlots[index] ?? []}
								groupId={groupId}
								type='DAY_SPECIFIC'
								day={index}
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
