type ParticipantsAreaProps = {
	eventId: string
	maxParticipants?: number
}

import { prisma } from '@/src/server/db/client'
import { ParticipantsArea } from './ParticipantsArea'

export const ParticipantsAreaServer = async ({
	eventId,
	maxParticipants,
}: ParticipantsAreaProps) => {
	const participants = await prisma.participantsOnEvents.findMany({
		where: { eventId },
		select: {
			userEventStatus: true,
			comment: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	})

	const joinedUsers = participants.filter(
		(participant) => participant.userEventStatus === 'JOINED',
	)

	const joinedUsersAmount = joinedUsers.length

	return (
		<ParticipantsArea
			joinedUsersAmount={joinedUsersAmount}
			maxParticipants={maxParticipants}
			participants={participants}
		/>
	)
}
