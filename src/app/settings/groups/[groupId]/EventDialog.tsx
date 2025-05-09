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
import type { Event } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface EventDialogProps {
	templates: Partial<Event>[]
	open?: boolean
	onOpenChange?: (open: boolean) => void
	initialTime?: {
		startTime: string
		endTime: string
		date: string
	}
}

export const EventDialog = ({
	templates,
	open,
	onOpenChange,
	initialTime,
}: EventDialogProps) => {
	const [internalOpen, setInternalOpen] = useState(false)

	const isControlled = open !== undefined && onOpenChange !== undefined
	const isOpen = isControlled ? open : internalOpen
	const setOpen = isControlled ? onOpenChange : setInternalOpen

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			{!isControlled && (
				<DialogTrigger asChild>
					<Button
						type='button'
						variant='purple'
						className='flex rounded-full w-10'
					>
						<PlusIcon className='h-2 w-2' />
					</Button>
				</DialogTrigger>
			)}
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Event erstellen</DialogTitle>
					<DialogDescription>
						Erstelle ein neues Event für deine Gruppe
					</DialogDescription>
				</DialogHeader>
				<AddEventForm
					onSubmit={() => {
						setOpen(false)
					}}
					templates={templates}
					initialTime={initialTime}
				/>
			</DialogContent>
		</Dialog>
	)
}
