import { Button } from '@/ui/button'

import { setParticipatingStatus } from '../../group/[groupId]/actions'

export const NotificationStatusButton = ({ eventId }: { eventId: string }) => {
	return (
		<form>
			<Button
				formAction={async () => {
					'use server'
					await setParticipatingStatus({
						eventId,
						status: 'CANCELED',
					})
				}}
				variant='link'
			>
				Keine Emails mehr erhalten
			</Button>
		</form>
	)
}
