'use client'

import { GroupAvailabilityView } from '@/src/components/GroupAvailability'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { ArrowLeft, Plus, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { UserList } from './UsersList'

// Sample data
const users = [
	{ id: 1, name: 'You', color: '#3b82f6' },
	{ id: 2, name: 'Alex', color: '#10b981' },
	{ id: 3, name: 'Taylor', color: '#f59e0b' }
]

export default function GroupAvailabilityPage() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [selectedUsers, setSelectedUsers] = useState(users)

	const toggleUser = (userId: number) => {
		setSelectedUsers((prev) => {
			const isSelected = prev.some((u) => u.id === userId)
			if (isSelected) {
				return prev.filter((u) => u.id !== userId)
			} else {
				const user = users.find((u) => u.id === userId)
				return [...prev, user!]
			}
		})
	}

	return (
		<div className='container mx-auto py-6'>
			<div className='mb-6 flex items-center'>
				<Link href='/'>
					<Button variant='ghost' size='sm'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
				</Link>
				<h1 className='ml-4 text-2xl font-bold'>Group Availability</h1>
				<div className='ml-auto'>
					<Button>
						<UserPlus className='mr-2 h-4 w-4' />
						Invite User
					</Button>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-[300px_1fr]'>
				<div className='space-y-4'>
					<div className='rounded-lg border p-4'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={setDate}
							className='mx-auto'
						/>
					</div>

					<div className='rounded-lg border p-4'>
						<div className='mb-2 flex items-center justify-between'>
							<h3 className='font-medium'>Team Members</h3>
							<Button variant='ghost' size='sm'>
								<Plus className='h-4 w-4' />
							</Button>
						</div>
						<UserList
							users={users}
							selectedUsers={selectedUsers}
							onToggleUser={toggleUser}
						/>
					</div>
				</div>

				<div className='rounded-lg border p-4'>
					<h2 className='mb-4 text-xl font-semibold'>
						{date
							? date.toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'long',
									day: 'numeric'
								})
							: 'Select a date'}
					</h2>

					{date && <GroupAvailabilityView date={date} users={selectedUsers} />}
				</div>
			</div>
		</div>
	)
}
