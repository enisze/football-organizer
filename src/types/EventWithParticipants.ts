import type { Event, ParticipantsOnEvents } from '@/prisma/generated/client'

export type EventWithParticipants = (Event & {
  participants: ParticipantsOnEvents[]
})[]
