import type { UserEventStatus } from '@prisma/client'

type ParticipantListProps = {
	label: string
	status: UserEventStatus
	participants: {
		userEventStatus: UserEventStatus
		comment: string | null
		user: {
			id: string
			name: string
		}
	}[]
}

export const ParticipantsList = ({
	label,
	status,
	participants,
}: ParticipantListProps) => {
	const filteredParticipants = participants.filter(
		(participant) => participant.userEventStatus === status,
	)

	if (filteredParticipants.length === 0) return null

	return (
		<div>
			<div className="text-sm font-medium text-slate-400 mb-1.5">{label}</div>
			<div className="space-y-1.5">
				{filteredParticipants.map((participant) => (
					<div
						key={participant.user.id}
						className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/30"
					>
						<div className="text-slate-300">{participant.user.name}</div>
						{participant.comment && (
							<div className="text-sm text-slate-400">
								{participant.comment}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
