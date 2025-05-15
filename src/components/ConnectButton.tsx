import { cn } from '@/lib/utils/cn'
import { buttonVariants } from '@/ui/button'
import { CalendarDays, Mail } from 'lucide-react'
import { SCOPES, oAuth2Client } from '../server/google'

interface ConnectButtonProps {
	type: 'calendar' | 'email'
	className?: string
}

export function ConnectButton({ type, className }: ConnectButtonProps) {
	const link = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES[type],
		prompt: 'consent',
		redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
	})

	return (
		<a
			className={cn(
				buttonVariants({
					variant: 'outline',
				}),
				'flex items-center gap-2',
			)}
			href={link}
		>
			{type === 'calendar' ? (
				<>
					<CalendarDays className='h-4 w-4' />
					Mit Google Kalender verbinden
				</>
			) : (
				<>
					<Mail className='h-4 w-4' />
					Mit Gmail verbinden
				</>
			)}
		</a>
	)
}
