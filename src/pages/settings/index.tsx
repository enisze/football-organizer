import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import { Button } from '@/ui/base/Button'
import { Label } from '@/ui/base/Label'
import { Separator } from '@/ui/base/Separator'
import { Switch } from '@/ui/base/Switch'
import { TextField } from '@/ui/base/TextField'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useMemo, useState } from 'react'

import { LoadingWrapper } from '../../components/LoadingWrapper'
import Navbar from '../../components/Navigation/Navbar'
import { trpc } from '../../utils/trpc'

const Settings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id
  const userName = data?.user?.name

  const [userNameForDeletion, setUserNameForDeletion] = useState('')

  const userCanBeDeleted = useMemo(() => {
    return userNameForDeletion === userName
  }, [userNameForDeletion, userName])

  const router = useRouter()

  const trpcContext = trpc.useContext()

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

  const { mutate: deleteUser } = trpc.user.delete.useMutation({})

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-[220px_8px_auto]">
        <SettingsSidebar />

        <Separator orientation="vertical" />

        <div className="flex flex-col gap-y-2 p-2">
          <h3 className="font-bold">Nutzereinstellungen</h3>
          <div className="flex items-center space-x-2">
            <Label>Alle Benachrichtigungen</Label>
            <LoadingWrapper isLoading={isLoading}>
              <Switch
                id="notifications-enabled"
                checked={notificationStatus?.notificationsEnabled}
                onChange={() => {
                  updateNotificationsEnabled({
                    notificationsEnabled:
                      !notificationStatus?.notificationsEnabled,
                  })
                }}
              />
            </LoadingWrapper>
          </div>
          <TextField
            id="user-name-input"
            type="text"
            label="Benutzername eingeben um zu löschen"
            text=""
            onChange={(name) => setUserNameForDeletion(name.target.value)}
            value={userNameForDeletion}
          />
          <Button
            onClick={() => {
              if (userCanBeDeleted) {
                deleteUser()
                router.push('/')
              }
            }}
            disabled={!userCanBeDeleted}
            variant="destructive"
          >
            Löschen
          </Button>
        </div>
      </div>
      <Separator className="" />
    </>
  )
}

export default Settings
