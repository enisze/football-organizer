'use client'
import { revalidatePathAction } from '@/src/app/group/[groupId]/actions'
import { signOut, useSession } from '@/src/lib/auth-client'
import { routes } from '@/src/shared/navigation'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Separator } from '@/ui/separator'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { type FunctionComponent, type ReactNode, useState } from 'react'
import { NotificationBubble } from '../NotificationBubble'

export const OrganizerMenu: FunctionComponent<{
	balance: number | null | undefined
	selector: ReactNode
	groupId?: string
}> = ({ balance, selector, groupId }) => {
	const [open, setOpen] = useState(false)
	const { data } = useSession()
	const pathname = usePathname()

	const isOnDashboard = pathname?.includes('/group/')

	if (!data?.user) return null

	const hasPaypalName = Boolean(data.user.paypalName)

	const name = data.user.name
	const lettersOnly = (name ?? '').replace(/[^A-Za-z\s]/g, '').trim()

	let first = 'X'
	let second = 'X'

	if (lettersOnly) {
		const words = lettersOnly.split(/\s+/)
		if (words.length > 1) {
			first = words[0]?.charAt(0) || 'X'
			second = words[1]?.charAt(0) || 'X'
		} else {
			first = lettersOnly.charAt(0) || 'X'
			second = lettersOnly.charAt(1) || 'X'
		}
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='flex items-center justify-between gap-x-2'>
				<div className='relative flex'>
					<Avatar className='flex items-center justify-center border-[1px]'>
						<AvatarFallback className='bg-white dark:bg-slate-900'>
							{first + second}
						</AvatarFallback>
					</Avatar>
					{!hasPaypalName && <NotificationBubble />}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setOpen(!open)}>
					{name}
				</DropdownMenuItem>
				{selector}
				<DropdownMenuItem>Kontostand: {balance ?? 0}€</DropdownMenuItem>

				{isOnDashboard && (
					<DropdownMenuItem onClick={() => setOpen(!open)}>
						<div className='relative flex w-full'>
							<Link href={`/settings/groups/${groupId}`}>
								Gruppeneinstellungen
							</Link>
						</div>
					</DropdownMenuItem>
				)}

				<Separator />

				<DropdownMenuItem onClick={() => setOpen(!open)}>
					<div className='relative flex w-full'>
						<Link href={routes.groupSettings()}>Meine Gruppen</Link>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => setOpen(!open)}>
					<div className='relative flex w-full'>
						<Link href={'/settings/user'}>Accounteinstellungen</Link>
						{!hasPaypalName && <NotificationBubble />}
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={async () => {
						await signOut({
							fetchOptions: {
								onSuccess: () => {
									revalidatePathAction({
										path: routes.home(),
									})
									redirect(routes.signIn())
								},
							},
						})
					}}
				>
					Ausloggen
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
