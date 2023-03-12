import type { Event, ParticipantsOnEvents } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import { differenceInCalendarDays } from 'date-fns'
import { Activity, CalendarDays, Euro, Zap } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { transformDate } from '../../helpers/transformDate'
import { MapAccordion } from '../Map/MapAccordion'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { EventCardAdminArea } from './EventCardAdminArea'
import { ParticipantsArea } from './ParticipantsArea'
import { StatusChip } from './StatusChip'

type EventCardProps = {
  event: Event
  participants: ParticipantsOnEvents[]
}

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
}) => {
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

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id,
    address,
  })

  const currentDate = new Date()
  const days = differenceInCalendarDays(date, currentDate)

  const eventString =
    days < 0 ? 'Vergangenes Event' : days === 0 ? 'Heute' : `In ${days} Tagen`

  const fullEventString = status === 'CANCELED' ? 'Abgesagt' : eventString
  const fullEventStringStyle = status === 'CANCELED' ? 'text-red-500' : 'none'

  return (
    <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px] md:w-[400px]">
      <div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 p-4 shadow-xl dark:bg-gradient-to-tl dark:from-slate-900 dark:to-slate-700">
        <div className="grid grid-cols-10 gap-x-1">
          <div className="h-full flex w-full col-span-1 gap-x-1">
            <div className="flex flex-col items-center">
              <div className="w-full font-bold items-center flex">SA</div>
              <AddToCalendarButton event={event} />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 col-span-9">
            <div className="flex items-center gap-x-1 w-full">
              {/* <SlideInActions test="" /> */}
              <Zap className="h-4 w-4 opacity-70" />
              <span className={`font-bold ${fullEventStringStyle}`}>
                {fullEventString}
              </span>

              <Euro className="h-4 w-4 opacity-70" />
              <span> {`${cost / maxParticipants}`}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Activity className="h-4 w-4 opacity-70" />
              <span className="font-bold">Status:</span>
              <StatusChip status={status} />
            </div>
            <div>
              <div className="flex items-center gap-x-1">
                <CalendarDays className="h-4 w-4 opacity-70" />
                <span>
                  {transformDate(date) + ' ' + [startTime, endTime].join('-')}
                </span>
              </div>
              {data && (
                <MapAccordion
                  address={address}
                  coordinates={data}
                  isLoading={isLoading}
                />
              )}
            </div>
            <ParticipantsArea
              eventId={id}
              participants={participants}
              maxParticipants={maxParticipants}
            />

            <EventCardAdminArea eventId={id} />
            <PaymentArea eventId={id} bookingDate={bookingDate} />
            <EventStatusArea id={id} participants={participants} />
          </div>
        </div>
      </div>
    </div>
  )
}
