import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import type { EventStatus } from '@prisma/client'
import type { FunctionComponent } from 'react'

const StatusDot: FunctionComponent<{
	status: EventStatus
	size?: 'sm' | 'md'
}> = ({ status, size = 'sm' }) => {
	const colors = {
		BOOKED: 'bg-green-500',
		CANCELED: 'bg-red-500',
		CREATED: 'bg-gray-400',
	}

	const sizes = {
		sm: 'size-[6px]',
		md: 'size-2',
	}

	return (
		<div
			className={`${sizes[size]} rounded-full ${colors[status]} ${size === 'md' ? 'opacity-70' : ''}`}
		/>
	)
}

export const StatusChip: FunctionComponent<{
	status: EventStatus
}> = ({ status }) => {
	return (
		<Popover>
			<PopoverTrigger aria-label="event-status-button">
				<div className="flex items-center gap-2 border rounded-full px-2 font-semibold border-blue-500 text-xs">
					<StatusDot status={status} />
					{status === 'BOOKED'
						? 'Gebucht'
						: status === 'CANCELED'
							? 'Abgesagt'
							: 'Unklar'}
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-full">
				<div className="flex items-center gap-2">
					<StatusDot status="BOOKED" size="md" />
					<span>Gebucht, und findet statt.</span>
				</div>
				<div className="flex items-center gap-2">
					<StatusDot status="CANCELED" size="md" />
					<span>Abgesagt, findet sicher nicht statt.</span>
				</div>
				<div className="flex items-center gap-2">
					<StatusDot status="CREATED" size="md" />
					<span>Nicht gebucht, brauchen noch Teilnehmer.</span>
				</div>
			</PopoverContent>
		</Popover>
	)
}
