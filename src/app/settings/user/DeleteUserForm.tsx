'use client'

import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { deleteUser } from './actions'

export const DeleteUserForm = ({ userName }: { userName: string }) => {
  const [userNameForDeletion, setUserNameForDeletion] = useState('')

  const { data } = useSession()
  const deleteUserAction = async () => {
    await deleteUser({ session: data })
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      <TextField
        id="user-name-input"
        type="text"
        label={`Benutzername ${userName} eingeben um zu löschen`}
        text=""
        value={userNameForDeletion}
        onChange={(e) => setUserNameForDeletion(e.target.value)}
        placeholder={userName}
      />
      <Button
        disabled={userNameForDeletion !== userName}
        className="w-fit"
        variant="destructive"
        type="submit"
        formAction={deleteUserAction}
      >
        Löschen
      </Button>
    </>
  )
}
