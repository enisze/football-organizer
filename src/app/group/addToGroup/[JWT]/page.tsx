'use client'
import { Button } from '@/ui/button'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { useToast } from '@/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import { Navbar } from '@/src/components/Navigation/Navbar'
import { api } from '@/src/server/trpc/client'

export default async function AddToGroup () {
  const params = useParams()

  const JWT = params?.JWT as string

  const { toast } = useToast()

  const { data } = useSession()

  const { groupName, id, ownerName  } =await  api.group.getDataFromJWT.query(
    { JWT },
  )

  const users = await api.group.getUsers.query(
    { id: id ?? '' },
  )

  const userIds = users?.map((user) => user?.id)

  if (userIds?.includes(data?.user?.id)) {
    return <div>Already member</div>
  }

  const mutate = async ({JWT}:{JWT:string})=>{
    await  api.group.addUserViaJWT.mutate({JWT})

      toast({
        title: 'Erfolgreich',
        description: 'Du wurdest der Gruppe hinzugefügt.',
      })
}

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full">
        <div>{`${ownerName} hat dich eingeladen seiner Gruppe ${groupName} beizutreten.`}</div>
        <Button onClick={() => mutate({ JWT })}>Beitreten</Button>
        <OrganizerLink href={'/'} className="justify-center">
          Zurück zu den Events
        </OrganizerLink>
      </div>
    </>
  )
}

