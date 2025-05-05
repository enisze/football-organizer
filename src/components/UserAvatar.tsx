'use client'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import { usePathname } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface UserAvatarProps {
	name: string | null
	className?: string
}

export const UserAvatar: FunctionComponent<UserAvatarProps> = ({
	name,
	className,
}) => {
	const lettersOnly = (name ?? '').replace(/[^A-Za-z\s]/g, '').trim()

	let first = 'X'
	let second = 'X'

	const pathname = usePathname()

	const onDashboard = pathname?.includes('/group/')

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

	if (!onDashboard) return null

	return (
		<Avatar className={className}>
			<AvatarFallback className='bg-white/5'>{first + second}</AvatarFallback>
		</Avatar>
	)
}
