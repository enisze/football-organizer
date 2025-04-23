import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import type { UserEventStatus } from '@prisma/client'
import { Users } from 'lucide-react'
import { ParticipantsList } from './ParticipantsList'

type ParticipantsAreaProps = {
	joinedUsersAmount: number
	maxParticipants?: number
	participants: {
		userEventStatus: UserEventStatus
		comment: string | null
		user: {
			id: string
			name: string
		}
	}[]
}

export const ParticipantsArea = ({
	joinedUsersAmount,
	maxParticipants,
	participants,
}: ParticipantsAreaProps) => {
	const joinedParticipants = participants.filter(
		(p) => p.userEventStatus === 'JOINED',
	)
	const maybeParticipants = participants.filter(
		(p) => p.userEventStatus === 'MAYBE',
	)
	const canceledParticipants = participants.filter(
		(p) => p.userEventStatus === 'CANCELED',
	)

	return (
		<div>
			<Accordion type='multiple' className='space-y-2'>
				<AccordionItem value='participants' className='border-none'>
					<AccordionTrigger className='p-0'>
						<div className='flex items-center justify-between w-full'>
							<div className='flex items-center gap-3'>
								<Users className='w-5 h-5 text-blue-400' />
								<span className='text-slate-300'>Teilnehmer</span>
							</div>
							<div className='bg-slate-700/50 px-2.5 py-1 rounded-full text-sm font-medium text-slate-300'>
								{joinedUsersAmount}/{maxParticipants}
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className='space-y-4 mt-4'>
							{joinedParticipants.length > 0 && (
								<ParticipantsList
									label='Dabei'
									status='JOINED'
									participants={participants}
								/>
							)}

							{maybeParticipants.length > 0 && (
								<ParticipantsList
									label='Vielleicht'
									status='MAYBE'
									participants={participants}
								/>
							)}

							{canceledParticipants.length > 0 && (
								<ParticipantsList
									label='Abgesagt'
									status='CANCELED'
									participants={participants}
								/>
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
