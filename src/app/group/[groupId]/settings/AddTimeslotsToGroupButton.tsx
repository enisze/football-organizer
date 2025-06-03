'use client'

import { Button } from '@/ui/button'
import { Clock } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { addAllUserTimeslotsToGroupAction } from './actions'

interface AddTimeslotsToGroupButtonProps {
	groupId: string
}

export const AddTimeslotsToGroupButton = ({
	groupId,
}: AddTimeslotsToGroupButtonProps) => {
	const [message, setMessage] = useState<string | null>(null)

	const { execute, isExecuting } = useAction(addAllUserTimeslotsToGroupAction, {
		onSuccess: (result) => {
			if (result.data?.connectedSlots === 0) {
				setMessage(
					'Alle deine Zeitslots sind bereits mit dieser Gruppe verbunden',
				)
			} else if (result.data?.connectedSlots) {
				setMessage(
					`${result.data.connectedSlots} Zeitslot(s) erfolgreich hinzugefügt`,
				)
			}
		},
		onError: (error) => {
			console.error('Error adding timeslots to group:', error)
			setMessage('Fehler beim Hinzufügen der Zeitslots')
		},
	})

	const handleAddTimeslots = () => {
		setMessage(null)
		execute({ groupId })
	}

	return (
		<div className='space-y-2'>
			<Button
				onClick={handleAddTimeslots}
				disabled={isExecuting}
				variant='outline'
				className='w-full flex items-center gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10'
			>
				<Clock className='h-4 w-4' />
				{isExecuting ? 'Hinzufügen...' : 'Alle meine Zeitslots hinzufügen'}
			</Button>
			{message && (
				<p
					className={`text-sm ${message.includes('Fehler') ? 'text-red-400' : 'text-green-400'}`}
				>
					{message}
				</p>
			)}
		</div>
	)
}
