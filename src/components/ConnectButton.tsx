'use client'

import { cn } from '@/lib/utils/cn'
import { refreshAuthTokenAction } from '@/src/app/group/[groupId]/availability/authActions'
import { Button } from '@/ui/button'
import { toast } from '@/ui/use-toast'
import { CalendarDays, Mail } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

interface ConnectButtonProps {
	type: 'calendar' | 'email'
	provider: 'google' | 'microsoft'
	className?: string
}

export function ConnectButton({
	type,
	provider,
	className,
}: ConnectButtonProps) {
	const router = useRouter()

	const { execute: executeRefresh, status } = useAction(
		refreshAuthTokenAction,
		{
			onSuccess: ({ data }) => {
				if (data?.redirect) {
					router.push(data.redirect)
				} else if (data?.success) {
					toast({
						title: 'Verbindung erfolgreich',
						description: `Die Verbindung mit ${provider === 'google' ? 'Google' : 'Microsoft'} ${type === 'calendar' ? 'Kalender' : 'Mail'} wurde erfolgreich hergestellt.`,
					})
				}
			},
			onError: () => {
				toast({
					title: 'Fehler bei der Verbindung',
					description: 'Bitte versuche es später erneut.',
					variant: 'destructive',
				})
			},
		},
	)

	const handleConnect = () => {
		executeRefresh({
			type,
			provider,
		})
	}

	return (
		<Button
			variant='outline'
			className={cn('flex items-center gap-2 w-full', className)}
			onClick={handleConnect}
			disabled={status === 'executing'}
		>
			{type === 'calendar' ? (
				<>
					<CalendarDays className='h-4 w-4' />
					Mit {provider === 'google' ? 'Google' : 'Microsoft'} Kalender
					verbinden
				</>
			) : (
				<>
					<Mail className='h-4 w-4' />
					Mit {provider === 'google' ? 'Gmail' : 'Outlook'} verbinden
				</>
			)}
		</Button>
	)
}
