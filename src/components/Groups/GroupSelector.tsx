'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/ui/select'
import type { UserOnGroups } from '@prisma/client'
import { SelectGroup } from '@radix-ui/react-select'
import { atom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{
	groups?: (UserOnGroups & { group: { name: string } })[]
}> = ({ groups }) => {
	const router = useRouter()
	const params = useParams()
	const groupId = params?.groupId as string

	//TODO: add name here
	return (
		<Select
			onValueChange={(val) => {
				router.push(`/group/${val}`)
			}}
			value={groupId}
		>
			<SelectGroup>
				<SelectLabel>Gruppe auswählen</SelectLabel>
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
