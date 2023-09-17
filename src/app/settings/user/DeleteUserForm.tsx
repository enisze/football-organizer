'use client'

import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { deleteUser } from './actions'

export const DeleteUserForm = ({ userName }: { userName: string }) => {
  const [message, setMessage] = useState('')

  const { data } = useSession()
  const deleteUserAction = async (formData: FormData) => {
    const res = await deleteUser(formData, data)

    if (res?.message) {
      setMessage(res?.message ?? '')
      return
    }

    await signOut({ callbackUrl: '/' })
  }

  return (
    <form action={deleteUserAction}>
      <TextField
        id="user-name-input"
        type="text"
        label={`Benutzername ${userName} eingeben um zu löschen`}
        text=""
        placeholder={userName}
        name="userNameForDeletion"
      />
      <Button className="w-fit" variant="destructive" type="submit">
        Löschen
      </Button>
      <Label>{message}</Label>
    </form>
  )
}
