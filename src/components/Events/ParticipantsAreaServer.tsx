type ParticipantsAreaProps = {
	eventId: string
	maxParticipants?: number
}

import { prisma } from '@/src/server/db/client'
import { ParticipantsArea } from './ParticipantsArea'

export const ParticipantsAreaServer = async ({
	eventId,
	maxParticipants
}: ParticipantsAreaProps) => {
	const participants = await prisma.participantsOnEvents.findMany({
		where: { eventId },
		select: {
			userEventStatus: true,
			comment: true,
			user: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	const joinedUsers = participants.filter(
		(participant) => participant.userEventStatus === 'JOINED'
	)
	const canceledUsers = participants.filter(
		(participant) => participant.userEventStatus === 'CANCELED'
	)

	const maybeUsers = participants.filter(
		(participant) => participant.userEventStatus === 'MAYBE'
	)

	const joinedUsersAmount = joinedUsers.length
	const canceledUsersAmount = canceledUsers.length
	const maybeUsersAmount = maybeUsers.length

	const allUsersLength = participants.length

	return (
		<ParticipantsArea
			joinedUsersAmount={joinedUsersAmount}
			canceledUsersAmount={canceledUsersAmount}
			maybeUsersAmount={maybeUsersAmount}
			allUsersLength={allUsersLength}
			maxParticipants={maxParticipants}
			participants={participants}
			eventId={eventId}
		/>
	)
}
