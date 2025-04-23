'use client'
import { AddEventForm } from '@/src/components/Events/AddEventForm'
import { Button } from '@/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog'
import { toast } from '@/ui/use-toast'
import type { Event } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface EventDialogProps {
	templates: Partial<Event>[]
}

export const EventDialog = ({ templates }: EventDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<Button
					type='button'
					variant='purple'
					className='flex rounded-full w-10'
				>
					<PlusIcon className='h-2 w-2' />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add Event</DialogTitle>
					<DialogDescription>
						Create a new event for your group
					</DialogDescription>
				</DialogHeader>
				<AddEventForm
					onSubmit={() => {
						setOpen(false)
						toast({
							title: 'Event erstellt',
							description: 'Das Event wurde erfolgreich erstellt.',
						})
					}}
					templates={templates}
				/>
			</DialogContent>
		</Dialog>
	)
}
