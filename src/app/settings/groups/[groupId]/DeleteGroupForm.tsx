'use client'

import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteGroup } from './actions'

export const DeleteGroupForm = ({
	groupName,
	groupId
}: {
	groupName: string
	groupId: string
}) => {
	const [groupNameForDeletion, setGroupNameForDeletion] = useState('')

	const router = useRouter()
	const deleteGroupAction = async () => {
		await deleteGroup({ groupId })

		router.push('/settings/groups')
	}

	return (
		<>
			<TextField
				id='group-name-input'
				type='text'
				label={`Gruppenname ${groupName} eingeben um zu löschen`}
				text=''
				value={groupNameForDeletion}
				onChange={(e) => setGroupNameForDeletion(e.target.value)}
				placeholder={groupName}
			/>
			<Button
				disabled={groupNameForDeletion !== groupName}
				className='w-fit'
				variant='destructive'
				type='submit'
				formAction={deleteGroupAction}
			>
				Löschen
			</Button>
		</>
	)
}
