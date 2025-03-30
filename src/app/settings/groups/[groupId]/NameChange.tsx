'use client'

import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { toast } from '@/ui/use-toast'
import { updateGroupName } from './actions'

export const NameChange = ({ groupName }: { groupName: string }) => {

	const updateName = async (formData: FormData) => {
		const groupNameEdit = await updateGroupName(formData)

		toast({
			title: 'Gruppenname geändert',
			description: `Der Gruppenname wurde erfolgreich zu ${groupNameEdit} geändert.`
		})
	}

	return (
		<>
			<TextField
				id='group-name-input'
				label='Gruppenname bearbeiten'
				name='groupName'
				placeholder={groupName}
				text=''
			/>
			<Button
				variant='outline'
				className='w-fit'
				type='submit'
				formAction={async (formData: FormData) => {
					await updateName(formData)
				}}
			>
				Speichern
			</Button>
		</>
	)
}
