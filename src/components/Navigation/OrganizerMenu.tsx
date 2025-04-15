'use client'
import { revalidateGroupAction } from '@/src/app/group/[groupId]/actions'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Switch } from '@/ui/switch'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, type FunctionComponent } from 'react'
import { NotificationBubble } from '../NotificationBubble'

export const OrganizerMenu: FunctionComponent<{
	balance: number | null | undefined
	selector: JSX.Element
	isOwner: boolean
}> = ({ balance, selector, isOwner }) => {
	const [open, setOpen] = useState(false)
	const { data } = useSession()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const groupId = pathname?.split('/').at(-1)

	const isOnDashboard = pathname?.includes('/group/')

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	if (!data?.user) return null

	const hasPaypalName = Boolean(data.user.paypalName)

	const name = data.user.name
	const res = name?.split(' ')
	const first = res ? (res[0]?.charAt(0) ?? 'X') : 'X'
	const second = res ? (res[1]?.charAt(0) ?? 'X') : 'X'

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger className="flex items-center justify-between gap-x-2">
				<div className="relative flex">
					<Avatar className="flex items-center justify-center border-[1px]">
						<AvatarFallback className="bg-white dark:bg-slate-900">
							{first + second}
						</AvatarFallback>
					</Avatar>
					{!hasPaypalName && <NotificationBubble />}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setOpen(!open)}>
					{name}
				</DropdownMenuItem>
				{selector}
				<DropdownMenuItem>Kontostand: {balance ?? 0}€</DropdownMenuItem>
				<Separator />

				<DropdownMenuItem hidden={!isOwner}>
					<div className="relative flex w-full items-center gap-x-1">
						<Label>Admin View</Label>
						<Switch
							id="admin-view"
							checked={isOwner}
							onClick={async () => {
								router.push(
									//@ts-expect-error next issue
									pathname + '?' + createQueryString('isOwner', !isOwner),
								)

								await new Promise((resolve) => setTimeout(resolve, 500))
								await revalidateGroupAction()
							}}
						/>
					</div>
				</DropdownMenuItem>

				{isOnDashboard && (
					<DropdownMenuItem onClick={() => setOpen(!open)}>
						<div className="relative flex w-full">
							<Link href={`/settings/groups/${groupId}`}>
								Gruppeneinstellungen
							</Link>
						</div>
					</DropdownMenuItem>
				)}

				<Separator />

				<DropdownMenuItem onClick={() => setOpen(!open)}>
					<div className="relative flex w-full">
						<Link href={'/settings/user'}>Accounteinstellungen</Link>
						{!hasPaypalName && <NotificationBubble />}
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={async () => {
						await signOut({ callbackUrl: '/' })
					}}
				>
					Ausloggen
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
