'use client'
import { bookEvent } from '@/src/app/group/[groupId]/actions'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

export const BookEventButton = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false)

	const { execute } = useAction(bookEvent)
	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogTrigger asChild>
				<Button variant="dark-success" className="w-full" type="button">
					Book
				</Button>
			</DialogTrigger>

			<DialogContent className="w-50">
				<DialogHeader>
					<DialogTitle>
						<h2 id="modal-title">Event buchen</h2>
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col justify-center">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							const formData = new FormData(e.currentTarget)
							const bookingDate = formData.get('bookingdate')?.toString()
							if (!bookingDate) {
								throw new Error('Booking date is required')
							}
							execute({
								eventId: id,
								bookingDate,
							})
							setOpen(false)
						}}
					>
						<TextField
							label="Datum"
							type="date"
							name="bookingdate"
							text={''}
							className="w-36"
						/>
						<Button
							variant="outline"
							color="info"
							type="submit"
							onClick={() => {
								setOpen(false)
							}}
							className="w-36"
						>
							Buchen
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
