'use client'
import { Button } from '@/ui/button'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog'
import { deleteEventAction } from './actions'

export const DeleteEventButton = ({ id }: { id: string }) => {
	return (
		<Dialog>
			<DialogTrigger asChild className='flex flex-col gap-y-2 justify-start'>
				<Button variant='outline'>Delete</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Delete Event</DialogTitle>
					<DialogDescription>Are you sure?</DialogDescription>
				</DialogHeader>
				<form className='w-full'>
					<Button
						variant='outline'
						formAction={async () => {
							await deleteEventAction({
								id,
							})
						}}
						className='w-full'
					>
						Delete
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
