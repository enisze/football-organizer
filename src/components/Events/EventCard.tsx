import type { Event } from '@/prisma/generated/client'
import { getLatLong } from '@/src/app/group/[groupId]/getLatLong'
import { formatter } from '@/src/helpers/formatter'
import { differenceInCalendarDays } from 'date-fns'
import { CalendarDays, Euro } from 'lucide-react'
import { MapAccordion } from '../Map/MapAccordion'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { DateInfo } from './DateInfo'
import { EventCardAdminArea } from './EventCardAdminArea'
import { ParticipantsAreaServer } from './ParticipantsAreaServer'
import { StatusChip } from './StatusChip'

type EventCardProps = {
  event: Event
}

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

export const EventCard = async ({ event }: EventCardProps) => {
  const {
    address,
    startTime,
    cost,
    endTime,
    date,
    id,
    status,
    maxParticipants,
    bookingDate,
  } = event

  const data = await getLatLong(address, id)

  const currentDate = new Date()
  const days = differenceInCalendarDays(date, currentDate)

  const eventString =
    days < 0 ? 'Vergangenes Event' : days === 0 ? 'Heute' : `In ${days} Tagen`

  const fullEventString = status === 'CANCELED' ? 'Abgesagt' : eventString
  const fullEventStringStyle = status === 'CANCELED' ? 'text-red-500' : 'none'

  const iconStyle = 'h-4 w-4 opacity-70 flex-none'

  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px] md:w-[400px]">
      <div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 shadow-xl dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-600">
        <div className="flex flex-col p-4 gap-y-2">
          <div className="flex justify-between gap-x-1 w-full">
            <DateInfo date={date} />

            <div className="flex items-center gap-x-2">
              <span className={`font-bold ${fullEventStringStyle}`}>
                {fullEventString}
              </span>
              <div className="flex justify-center border rounded-full w-5 h-5">
                <StatusChip status={status} />
              </div>
            </div>

            <AddToCalendarButton
              address={address}
              date={date}
              startTime={startTime}
              endTime={endTime}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-1">
              <CalendarDays className={iconStyle} />
              <span>{[startTime, endTime].join('-')}</span>
              <Euro className={iconStyle} />
              <span> {`${formatter.format(cost / maxParticipants)}`}</span>
            </div>
            {data && <MapAccordion address={address} coordinates={data} />}
            <ParticipantsAreaServer
              eventId={id}
              maxParticipants={maxParticipants}
            />

            <EventCardAdminArea eventId={id} />
            <PaymentArea eventId={id} bookingDate={bookingDate} />
            <EventStatusArea id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
