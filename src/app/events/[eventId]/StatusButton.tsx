import { Button } from '@/ui/button'

import { setParticipatingStatus } from '../../group/[groupId]/actions'

export const StatusButton = ({ eventId }: { eventId: string }) => {
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
				variant="outline"
				disabled={status === 'executing'}
			>
				Keine Emails mehr erhalten
			</Button>
		</form>
	)
}
