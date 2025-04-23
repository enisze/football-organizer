'use client'

import { signOut } from '@/src/lib/auth-client'
import { routes } from '@/src/shared/navigation'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { deleteUser } from './actions'

export const DeleteUserForm = ({ userName }: { userName: string }) => {
	const [userNameForDeletion, setUserNameForDeletion] = useState('')

	const deleteUserAction = async () => {
		await deleteUser()
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					redirect(routes.signIn())
				},
			},
		})
	}

	return (
		<>
			<TextField
				id='user-name-input'
				type='text'
				label={`Benutzername ${userName} eingeben um zu löschen`}
				text=''
				value={userNameForDeletion}
				onChange={(e) => setUserNameForDeletion(e.target.value)}
				placeholder={userName}
			/>
			<Button
				disabled={userNameForDeletion !== userName}
				className='w-fit'
				variant='destructive'
				type='submit'
				formAction={deleteUserAction}
			>
				Löschen
			</Button>
		</>
	)
}
