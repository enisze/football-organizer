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
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export const EventDialog = () => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<Button type="button" variant="purple" className="flex gap-2 w-fit">
					<PlusIcon className="h-4 w-4" />
					Neues Event
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Event</DialogTitle>
					<DialogDescription>Add a new event</DialogDescription>
				</DialogHeader>
				<AddEventForm
					onSubmit={() => {
						setOpen(false)
						toast({
							title: 'Event erstellt',
							description: 'Das Event wurde erfolgreich erstellt.',
						})
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
