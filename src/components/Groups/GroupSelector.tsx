'use client'
import { routes, useSafeParams } from '@/src/shared/navigation'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import type { UserOnGroups } from '@prisma/client'
import { SelectGroup } from '@radix-ui/react-select'
import { atom } from 'jotai'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{
	groups?: (UserOnGroups & { group: { name: string } })[]
}> = ({ groups }) => {
	const router = useRouter()
	const params = useSafeParams('settings')
	const groupId = params?.groupId

	return (
		<Select
			onValueChange={(val) => {
				router.push(
					routes.groupEvents({
						groupId: val,
					}),
				)
			}}
			value={groupId}
		>
			<SelectGroup>
				<SelectLabel className='p-0 pb-4'>
					Passe deine aktuelle Gruppe an
				</SelectLabel>
			</SelectGroup>
			<SelectTrigger className='w-[180px]' aria-label='group-selector'>
				<SelectValue placeholder='Gruppe auswählen' />
			</SelectTrigger>
			<SelectContent>
				{groups?.map((group) => (
					<SelectItem key={group.groupId} value={group.groupId}>
						{group.group.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
