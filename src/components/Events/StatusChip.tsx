import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import type { EventStatus } from '@prisma/client'
import { Check, X } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { QuestionMark } from '../QuestionMark'

export const StatusChip: FunctionComponent<{
	status: EventStatus
}> = ({ status }) => {
	return (
		<Popover>
			<PopoverTrigger aria-label="event-status-button">
				{status === 'BOOKED' ? (
					<div className="flex items-center gap-1">
						<Check className="h-4 w-4 text-green-500" />
						Gebucht
					</div>
				) : status === 'CANCELED' ? (
					<div className="flex items-center gap-1">
						<X className="h-4 w-4 text-red-500" />
						Abgesagt
					</div>
				) : (
					<div className="flex items-center gap-1">
						<QuestionMark className="h-4 w-4" />
						Nicht gebucht
					</div>
				)}
			</PopoverTrigger>
			<PopoverContent className="w-full">
				<div className="flex items-center">
					<Check className="mr-2 h-4 w-4 text-green-500 opacity-70" />
					<span>Gebucht, und findet statt. </span>
				</div>
				<div className="flex items-center">
					<X className="mr-2 h-4 w-4 text-red-500 opacity-70" />

					<span>Abgesagt, findet sicher nicht statt.</span>
				</div>
				<div className="flex items-center">
					<QuestionMark className="mr-2 h-4 w-4 opacity-70" />
					<span>Nicht gebucht, brauchen noch Teilnehmer.</span>
				</div>
			</PopoverContent>
		</Popover>
	)
}
