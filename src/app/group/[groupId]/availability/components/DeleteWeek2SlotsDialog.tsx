'use client'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog'
import { Label } from '@/ui/label'
import { useState } from 'react'

interface DeleteWeek2SlotsDialogProps {
	open: boolean
	onOpenChangeAction: (open: boolean) => void
	onConfirmAction: (deleteGlobally: boolean) => void
	hasGlobalSlots: boolean
}

export function DeleteWeek2SlotsDialog({
	open,
	onOpenChangeAction,
	onConfirmAction,
	hasGlobalSlots,
}: DeleteWeek2SlotsDialogProps) {
	const [deleteGlobally, setDeleteGlobally] = useState(true)

	const handleConfirm = () => {
		onConfirmAction(deleteGlobally)
		onOpenChangeAction(false)
		setDeleteGlobally(false)
	}

	const handleCancel = () => {
		onOpenChangeAction(false)
		setDeleteGlobally(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChangeAction}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Woche 2 Zeitfenster löschen</DialogTitle>
					<DialogDescription>
						Sie wechseln zurück zum wöchentlichen Modus. Möchten Sie alle
						Zeitfenster der Woche 2 löschen?
					</DialogDescription>
				</DialogHeader>

				{hasGlobalSlots && (
					<div className='flex items-center gap-x-2 justify-center'>
						<Checkbox
							id='delete-globally'
							checked={deleteGlobally}
							onCheckedChange={(checked) => setDeleteGlobally(checked === true)}
							className='rounded border-gray-300'
						/>
						<Label htmlFor='delete-globally' className='text-sm'>
							Auch in allen anderen Gruppen löschen{' '}
						</Label>
					</div>
				)}

				<DialogFooter className='flex flex-col gap-2'>
					<Button variant='destructive' onClick={handleConfirm}>
						Löschen
					</Button>
					<Button variant='outline' onClick={handleCancel}>
						Abbrechen
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
