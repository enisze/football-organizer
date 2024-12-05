'use client'

import { Switch } from '@/ui/switch'
import { useState } from 'react'
import { updateNotification } from './actions'

export const NotificationSwitch = ({
	notificationsEnabled
}: {
	notificationsEnabled: boolean
}) => {
	const [enabled, setEnabled] = useState(notificationsEnabled)

	return (
		<Switch
			id='notifications-enabled'
			checked={enabled}
			type='submit'
			onClick={() => {
				setEnabled(!enabled)
			}}
			formAction={updateNotification}
		/>
	)
}
