import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Separator } from '@/ui/separator'

import { prisma } from '@/src/server/db/client'
import { DeleteUserForm } from './DeleteUserForm'
import { NotificationSwitch } from './NotificationSwitch'
import { updateUserName } from './actions'

const Settings = async () => {
  const session = await getServerComponentAuthSession()

  const userId = session?.user?.id ?? ''

  if (!userId) return null

  const userName = session?.user?.name
  const paypalName = session?.user?.paypalName

  const userInfo = await prisma.user.findUnique({
    where: { id: userId },
    select: { notificationsEnabled: true, paypalName: true },
  })

  const notificationsEnabled = userInfo?.notificationsEnabled
  const paypalNameDb = userInfo?.paypalName

  return (
    <>
      <Separator orientation="vertical" />

      <form className="flex flex-col gap-y-2 p-2">
        <h3 className="font-bold">Nutzereinstellungen</h3>
        <Label>Alle Benachrichtigungen</Label>
        <NotificationSwitch
          session={session}
          notificationsEnabled={Boolean(notificationsEnabled)}
        />

        <TextField
          id="user-name-input"
          type="text"
          label={`Paypal Name`}
          text=""
          name="paypalName"
          infoContent={
            <div>
              Du solltest deinen Paypal namen spezifizieren, damit dein
              Bezahlstatus korrekt angezeigt wird.
            </div>
          }
          placeholder="Paypal Name"
          defaultValue={paypalNameDb ?? undefined}
          withBubble={!paypalName}
        />

        <Button
          type="submit"
          className="w-fit"
          formAction={async (formData) => {
            'use server'

            updateUserName(formData, session)
          }}
        >
          Speichern
        </Button>

        <DeleteUserForm userName={userName ?? ''} />
      </form>
    </>
  )
}

export default Settings
