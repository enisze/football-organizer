'use client'
import { Button } from '@/ui/button'
import { toast } from '@/ui/use-toast'
import { sendReminderEventAction } from './actions'

export const RemindButton = ({ id }: { id: string }) => {
	return (
		<Button
			variant="dark-primary"
			formAction={async () => {
				await sendReminderEventAction({
					id,
				})

				toast({
					title: 'Erinnerung gesendet',
					description: `Für das Event mit der ID ${id} wurde eine Erinnerung gesendet.`,
				})
			}}
		>
			Remind
		</Button>
	)
}
