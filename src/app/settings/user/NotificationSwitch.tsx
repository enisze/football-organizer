'use client'

import { Switch } from '@/ui/switch'
import type { Session } from 'next-auth'
import { useState } from 'react'
import { updateNotification } from './actions'

export const NotificationSwitch = ({
  notificationsEnabled,
  session,
}: {
  notificationsEnabled: boolean
  session: Session | null
}) => {
  const [enabled, setEnabled] = useState(notificationsEnabled)

  return (
    <Switch
      id="notifications-enabled"
      checked={enabled}
      type="submit"
      onClick={() => {
        setEnabled(!enabled)
      }}
      formAction={() => {
        updateNotification(session)
      }}
    />
  )
}
