'use client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { addToGroupAction } from './action'

export const SuccessComp = ({
	code,
}: {
	code: string | undefined | null
}) => {
	const [groupName, setGroupName] = useState<string | null>(null)
	const [groupId, setGroupId] = useState<string | null>(null)

	return (
		<div className="space-y-4">
			<form
				action={async (formData) => {
					const code = formData.get('code') as string
					const res = await addToGroupAction({
						code,
					}).then((res) => {
						return res?.data
					})

					if (res?.group.name) {
						setGroupName(res.group.name)
						setGroupId(res.group.id)
					}
				}}
				className="space-y-4"
			>
				<Input
					name="code"
					placeholder="XXXXXX"
					type="text"
					className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
					maxLength={6}
					defaultValue={code ?? undefined}
				/>
				<Button type="submit" className="w-full">
					Beitreten
				</Button>
			</form>

			{groupName && (
				<div className="flex flex-col items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
					<div className="flex items-center gap-2 text-emerald-400">
						<CheckCircleIcon className="h-5 w-5" />
						<span>Du bist Gruppe {groupName} beigetreten</span>
					</div>

					<OrganizerLink
						href={`/group/${groupId}`}
						className="text-white hover:text-white/70 transition-colors"
					>
						Hier geht es zur Gruppe
					</OrganizerLink>
				</div>
			)}
		</div>
	)
}
