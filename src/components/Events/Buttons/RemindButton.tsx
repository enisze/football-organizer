'use client'
import { Button } from '@/ui/button'
import { toast } from '@/ui/use-toast'
import { sendReminderEvent } from './actions'

export const RemindButton = async ({ id }: { id: string }) => {
	return (
		<Button
			variant='outline'
			formAction={async () => {
				await sendReminderEvent(id)

				toast({
					title: 'Erinnerung gesendet',

					description:
						'Für das Event mit der ID ' +
						id +
						' wurde eine Erinnerung gesendet.'
				})
			}}
		>
			Remind
		</Button>
	)
}
