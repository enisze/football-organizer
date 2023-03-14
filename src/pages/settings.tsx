import { Label } from '@/ui/base/Label'
import { Switch } from '@/ui/base/Switch'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

import { z } from 'zod'
import { LoadingWrapper } from '../components/LoadingWrapper'
import { trpc } from '../utils/trpc'

const newGroupSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Der Gruppenname ist zu kurz. Mindestlaenge 5.' }),
})

const Settings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const router = useRouter()

  const trpcContext = trpc.useContext()
  const [selectedGroupId, setSelectedGroupId] = useState('')

  const { data: groups, isLoading: loadingGroups } =
    trpc.group.getGroupNamesOwnedByUser.useQuery({
      ownerId: userId ?? '',
    })

  const { data: usersOfGroup, isLoading: loadingUsers } =
    trpc.group.getUsers.useQuery({ id: selectedGroupId })

  const { mutate: deleteUser } = trpc.user.delete.useMutation()

  const { data: notificationStatus, isLoading } =
    trpc.user.getNotificationStatus.useQuery(undefined, {
      enabled: Boolean(userId),
    })

  const { mutate: updateNotificationsEnabled } =
    trpc.user.updateNotifications.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h3>Einstellungen</h3>

      <h2>Nutzereinstellungen</h2>
      <h1>Alle Benachrichtigungen: Toggle: Ein / Ausschalten</h1>

      <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode">Notifications</Label>
        <LoadingWrapper isLoading={isLoading}>
          <Switch
            id="notifications-enabled"
            checked={notificationStatus?.notificationsEnabled}
            onChange={() => {
              updateNotificationsEnabled({
                notificationsEnabled: !notificationStatus?.notificationsEnabled,
              })
            }}
          />
        </LoadingWrapper>
      </div>
      <h2>Gruppeneinstellungen</h2>
      {groups?.map((group, idx) => {
        return <div key={idx}>{group.name}</div>
      })}
      {usersOfGroup?.map((user, idx) => {
        return <div key={idx}>{user?.name}</div>
      })}

      <h3>Kritische Zone</h3>

      <p>Gruppe loeschen - dropdown aller gruppen vom user, </p>
      {groups?.map((group, idx) => {
        return <div key={idx}>{group.name}</div>
      })}
      <p>Type group name:</p>

      <Label>Account loeschen</Label>
    </div>
  )
}

export default Settings
