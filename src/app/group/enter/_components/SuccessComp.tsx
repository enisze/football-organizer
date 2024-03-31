'use client'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { addToGroup } from './action'

export const SuccessComp = () => {
  const [success, setSuccess] = useState<string | null>(null)

  return (
    <form
      action={async (formData) => {
        const code = formData.get('code') as string
        const res = await addToGroup(code)

        if (res?.group.name) {
          setSuccess(res.group.name)
        }
      }}
      className="flex flex-col gap-2"
    >
      <Input name="code" placeholder="Group Code" type="text" />
      <Button type="submit">Beitreten</Button>

      {success && (
        <div className="flex gap-2 justify-center">
          <CheckCircleIcon />
          <span>Du bist Gruppe {success} beigetreten</span>
        </div>
      )}
    </form>
  )
}
