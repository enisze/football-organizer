import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { redirect } from 'next/navigation'
import type { FunctionComponent } from 'react'
import { serverAuth, serverSignOut } from '../server/auth/session'
import { routes } from '../shared/navigation'

interface UserAvatarProps {
	name: string | null
	className?: string
}

export const UserAvatarWithLogout: FunctionComponent<UserAvatarProps> = async ({
	name,
	className,
}) => {
	const lettersOnly = (name ?? '').replace(/[^A-Za-z\s]/g, '').trim()

	const session = await serverAuth()

	if (!session) {
		return null
	}

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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className={className}>
					<AvatarFallback className='bg-white/5'>
						{first + second}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem asChild>
					<form>
						<button
							formAction={async () => {
								'use server'
								const { success } = await serverSignOut()

								if (success) {
									redirect(routes.signIn())
								}
							}}
							type='submit'
						>
							Ausloggen
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
