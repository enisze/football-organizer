'use client'

import { routes } from '@/src/shared/navigation'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteGroup } from './actions'

export const DeleteGroupForm = ({
	groupName,
	groupId,
}: {
	groupName: string
	groupId: string
}) => {
	const [groupNameForDeletion, setGroupNameForDeletion] = useState('')

	const router = useRouter()

	return (
		<form>
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
				formAction={async () => {
					await deleteGroup({ groupId })
					router.push(routes.groupSettings())
				}}
			>
				Löschen
			</Button>
		</form>
	)
}
