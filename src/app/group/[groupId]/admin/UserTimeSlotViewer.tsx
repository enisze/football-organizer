'use client'

import { revalidateTagAction } from '@/src/app/group/[groupId]/actions'
import { WeeklyAvailabilityEditor } from '@/src/components/WeeklyAvailabilityEditor'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import type { TimeSlot, User } from '@prisma/client'
import { useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

interface UserTimeSlotViewerProps {
	users: Pick<User, 'id' | 'name' | 'email'>[]
	groupId: string
	timeSlots: Record<number, TimeSlot[]>
	selectedUserId?: string
}

export function UserTimeSlotViewer({
	users,
	groupId,
	timeSlots,
	selectedUserId: initialUserId,
}: UserTimeSlotViewerProps) {
	const [userId, setUserId] = useQueryState('userId', {
		defaultValue: initialUserId ?? users[0]?.id ?? '',
		shallow: true,
	})

	const refresh = useDebouncedCallback(() => {
		revalidateTagAction({ tagId: 'userTimeslots' })
	}, 300)

	const handleUserChange = (newUserId: string) => {
		setUserId(newUserId)
		refresh()
	}

	return (
		<div className='space-y-6'>
			<Select value={userId} onValueChange={handleUserChange}>
				<SelectTrigger className='w-[300px]'>
					<SelectValue placeholder='Select a user' />
				</SelectTrigger>
				<SelectContent>
					{users.map((user) => (
						<SelectItem key={user.id} value={user.id}>
							{user.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<WeeklyAvailabilityEditor timeSlots={timeSlots} groupId={groupId} />
		</div>
	)
}
