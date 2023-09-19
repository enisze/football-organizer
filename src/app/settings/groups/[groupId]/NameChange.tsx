'use client'

import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { toast } from '@/ui/use-toast'
import { useParams } from 'next/navigation'
import { updateGroupName } from './actions'

export const NameChange = ({ groupName }: { groupName: string }) => {
  const params = useParams()

  const groupId = params?.groupId as string

  const updateName = async (formData: FormData, groupId: string) => {
    const groupNameEdit = await updateGroupName(formData, groupId)

    toast({
      title: 'Gruppenname geändert',
      description: `Der Gruppenname wurde erfolgreich zu ${groupNameEdit} geändert.`,
    })
  }

  return (
    <>
      <TextField
        id="group-name-input"
        label="Gruppenname bearbeiten"
        name="groupName"
        placeholder={groupName}
        text=""
      />
      <Button
        variant="outline"
        className="w-fit"
        type="submit"
        formAction={(formData: FormData) => {
          updateName(formData, groupId)
        }}
      >
        Speichern
      </Button>
    </>
  )
}
