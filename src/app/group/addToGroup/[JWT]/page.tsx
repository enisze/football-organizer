'use client'
import { Button } from '@/ui/button'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { useToast } from '@/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import { api } from '@/src/server/trpc/api'

export default function AddToGroup() {
  const params = useParams()

  const JWT = params?.JWT as string

  const { toast } = useToast()

  const { data: session } = useSession()

  const { data } = api.group.getDataFromJWT.useQuery({
    JWT,
  })

  const { data: users } = api.group.getUsers.useQuery({ id: data?.id ?? '' })

  const userIds = users?.map((user) => user?.id)

  if (userIds?.includes(session?.user?.id)) {
    return <div>Already member</div>
  }

  const { mutate } = api.group.addUserViaJWT.useMutation({
    onSuccess: () => {
      toast({
        title: 'Erfolgreich',
        description: 'Du wurdest der Gruppe hinzugefügt.',
      })
    },
  })

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div>{`${data?.ownerName} hat dich eingeladen seiner Gruppe ${data?.groupName} beizutreten.`}</div>
        <Button onClick={() => mutate({ JWT })}>Beitreten</Button>
        <OrganizerLink href={'/'} className="justify-center">
          Zurück zu den Events
        </OrganizerLink>
      </div>
    </>
  )
}
