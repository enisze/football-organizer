import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'

import { z } from 'zod'
import { trpc } from '../utils/trpc'

const newGroupSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Der Gruppenname ist zu kurz. Mindestlaenge 5.' }),
})

const Settings: FunctionComponent = () => {
  const { data } = useSession()
  const router = useRouter()
  const userId = data?.user?.id

  const [selectedGroupId, setSelectedGroupId] = useState('')

  const { data: groups, isLoading: loadingGroups } =
    trpc.group.getGroupNamesOwnedByUser.useQuery({
      ownerId: userId ?? '',
    })

  const { data: usersOfGroup, isLoading: loadingUsers } =
    trpc.group.getUsers.useQuery({ id: selectedGroupId })

  const { mutate: deleteUser } = trpc.user.delete.useMutation()

  if (!userId) router.push('/')

  return (
    <div className="flex flex-col gap-y-4">
      <h3>Einstellungen</h3>

      <h2>Nutzereinstellungen</h2>
      <h1>Alle Benachrichtigungen: Toggle: Ein / Ausschalten</h1>
      <h2>Gruppeneinstellungen</h2>
      {groups?.map((group, idx) => {
        return <div key={idx}>{group.name}</div>
      })}
      {usersOfGroup?.map((user, idx) => {
        return <div key={idx}>{user}</div>
      })}

      <h3>Kritische Zone</h3>

      <p>Gruppe loeschen - dropdown aller gruppen vom user, </p>
      {groups?.map((group, idx) => {
        return <div key={idx}>{group.name}</div>
      })}
      <input>Type group name:</input>

      <p>Account loeschen</p>
      <input>Type your name</input>
    </div>
  )
}

export default Settings
