import { Button } from '@/ui/button'
import { updateInvitationCode } from './actions'

export const UpdateInvitationCodeButton = ({
	groupId,
}: { groupId: string }) => {
	return (
		<form>
			<Button
				variant='outline'
				type='submit'
				formAction={async () => {
					'use server'
					await updateInvitationCode({ groupId })
				}}
			>
				Neuen Code generieren
			</Button>
		</form>
	)
}
