'use client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { addToGroup } from './action'

export const SuccessComp = () => {
  const [groupName, setGroupName] = useState<string | null>(null)

  const [groupId, setGroupId] = useState<string | null>(null)

  return (
    <form
      action={async (formData) => {
        const code = formData.get('code') as string
        const res = await addToGroup(code)

        if (res?.group.name) {
          setGroupName(res.group.name)
          setGroupId(res.group.id)
        }
      }}
      className="flex flex-col gap-2"
    >
      <Input name="code" placeholder="Group Code" type="text" />
      <Button type="submit">Beitreten</Button>

      {groupName && (
        <div className="flex gap-2 justify-center">
          <CheckCircleIcon />
          <span>Du bist Gruppe {groupName} beigetreten</span>

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          <OrganizerLink href={`/group/${groupId}` as any}>
            Hier geht es zur Gruppe
          </OrganizerLink>
        </div>
      )}
    </form>
  )
}
