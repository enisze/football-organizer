'use client'
import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/button'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { useToast } from '@/ui/use-toast'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'

const NavBar = dynamic(() => import('@/src/components/Navigation/Navbar'), {
  ssr: false,
})

const AddToGroup: FunctionComponent = () => {
  const router = useRouter()

  const JWT = router.query.JWT as string

  const { toast } = useToast()

  const { data } = useSession()

  const { data: groupData } = trpc.group.getDataFromJWT.useQuery(
    { JWT },
    { enabled: Boolean(JWT) },
  )

  const { data: users } = trpc.group.getUsers.useQuery(
    { id: groupData?.id ?? '' },
    { enabled: !!groupData?.id },
  )

  const userIds = users?.map((user) => user?.id)

  if (userIds?.includes(data?.user?.id)) {
    return <div>Already member</div>
  }

  const { mutate } = trpc.group.addUserViaJWT.useMutation({
    onSuccess: () => {
      toast({
        title: 'Erfolgreich',
        description: 'Du wurdest der Gruppe hinzugefügt.',
      })
    },
  })

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full">
        <div>{`${groupData?.ownerName} hat dich eingeladen seiner Gruppe ${groupData?.groupName} beizutreten.`}</div>
        <Button onClick={() => mutate({ JWT })}>Beitreten</Button>
        <OrganizerLink href={'/'} className="justify-center">
          Zurück zu den Events
        </OrganizerLink>
      </div>
    </>
  )
}

export default AddToGroup
