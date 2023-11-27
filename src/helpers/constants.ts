import type { Event } from '@prisma/client'

export const defaultValues: Omit<
  Event,
  | 'uopdatedAt'
  | 'createdAt'
  | 'id'
  | 'updatedAt'
  | 'bookingDate'
  | 'status'
  | 'groupId'
> = {
  address: 'Zülpicher Wall 1, 50674 Köln',
  date: new Date(),
  startTime: '20:00',
  endTime: '21:30',
  cost: 45,
  maxParticipants: 10,
  environment: 'OUTDOOR',
}
