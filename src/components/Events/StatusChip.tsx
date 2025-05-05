import { cn } from '@/lib/utils/cn'
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
			className={cn(
				'rounded-full',
				sizes[size],
				colors[status],
				size === 'md' && 'opacity-70',
			)}
		/>
	)
}

export const StatusChip: FunctionComponent<{
	status: EventStatus
}> = ({ status }) => {
	return (
		<div className='flex items-center gap-2 border rounded-full px-2 font-semibold border-blue-500 text-xs'>
			<StatusDot status={status} />
			{status === 'BOOKED'
				? 'Gebucht'
				: status === 'CANCELED'
					? 'Abgesagt'
					: 'Unklar'}
		</div>
	)
}
