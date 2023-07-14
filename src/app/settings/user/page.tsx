'use client'
import { SpecificSettings } from '@/src/components/SettingsSidebar'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Switch } from '@/ui/switch'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { Navbar } from '@/src/components/Navigation/Navbar'
import { useToast } from '@/ui/use-toast'
import { LoadingWrapper } from '../../../components/LoadingWrapper'
import { trpc } from '../../../utils/trpc'

const Settings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id
  const userName = data?.user?.name
  const paypalName = data?.user?.paypalName

  const { data: paypalNameDb } = trpc.user.getPaypalName.useQuery(undefined, {
    enabled: Boolean(!paypalName) && Boolean(userId),
  })

  const [userNameForDeletion, setUserNameForDeletion] = useState('')

  const [newPaypalName, setNewPaypalName] = useState('')

  useEffect(() => {
    if (paypalNameDb?.paypalName) {
      setNewPaypalName(paypalName ?? paypalNameDb?.paypalName)
    }

    if (paypalName) {
      setNewPaypalName(paypalName)
    }
  }, [paypalName, paypalNameDb])

  const userCanBeDeleted = useMemo(() => {
    return userNameForDeletion === userName
  }, [userNameForDeletion, userName])

  const router = useRouter()

  const { toast } = useToast()

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

  const { mutate: deleteUser } = trpc.user.delete.useMutation()

  const { mutate: updatePaypalName } = trpc.user.updatePaypalName.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
      toast({
        title: 'Paypal Name wurde geändert',
      })
    },
  })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
        <SpecificSettings />

        <Separator orientation="vertical" />

        <div className="flex flex-col gap-y-2 p-2">
          <h3 className="font-bold">Nutzereinstellungen</h3>
          <div className="flex items-center space-x-2">
            <Label>Alle Benachrichtigungen</Label>
            <LoadingWrapper isLoading={isLoading}>
              <Switch
                id="notifications-enabled"
                checked={notificationStatus?.notificationsEnabled}
                onClick={() => {
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
            label={`Paypal Name`}
            text=""
            infoContent={
              <div>
                Du solltest deinen Paypal namen spezifizieren, damit dein
                Bezahlstatus korrekt angezeigt wird.
              </div>
            }
            placeholder="Paypal Name"
            onChange={(name) => setNewPaypalName(name.target.value)}
            value={newPaypalName}
            withBubble={!paypalName}
          />

          <Button
            onClick={() => {
              updatePaypalName({ name: newPaypalName })
            }}
            className="w-fit"
          >
            Speichern
          </Button>
          <TextField
            id="user-name-input"
            type="text"
            label={`Benutzername ${userName} eingeben um zu löschen`}
            text=""
            placeholder={userName}
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
            className="w-fit"
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