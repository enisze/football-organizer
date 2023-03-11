import type { Event, ParticipantsOnEvents } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/base/Accordion'
import { differenceInCalendarDays } from 'date-fns'
import { Activity, CalendarDays, Euro, MapPin, Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { FunctionComponent } from 'react'
import { transformDate } from '../../helpers/transformDate'
import { LoadingWrapper } from '../LoadingWrapper'
import type { OrganizerMapProps } from '../Map/OrganizerMap'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { EventCardAdminArea } from './EventCardAdminArea'
import { ParticipantsArea } from './ParticipantsArea'
import { StatusChip } from './StatusChip'

const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
  () => import('../Map/OrganizerMap').then((module) => module.OrganizerMap),
  {
    ssr: false,
  },
)

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
    <div className="h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px] md:w-[350px]">
      <div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 p-4 shadow-xl dark:bg-gradient-to-tl dark:from-slate-900 dark:to-slate-700">
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center gap-x-2">
            <Zap className="h-4 w-4 opacity-70" />
            <span className={`font-bold ${fullEventStringStyle}`}>
              {fullEventString}
            </span>

            <div className="flex items-center">
              <Euro className="h-4 w-4 opacity-70" />
              <span> {`${cost / maxParticipants}`}</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Activity className="h-4 w-4 opacity-70" />
            <span className="font-bold">Status:</span>
            <StatusChip status={status} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <CalendarDays className="h-4 w-4 opacity-70" />
            <span>
              {transformDate(date) + ' ' + [startTime, endTime].join('-')}
            </span>
          </div>
          {data && (
            <Accordion type="single" collapsible className="p-0">
              <AccordionItem
                value="item-1"
                className="border-b-0"
                style={{ padding: 0 }}
              >
                <AccordionTrigger className="p-0 hover:no-underline">
                  <div className="flex w-full items-center">
                    <MapPin className="mr-2 h-4 w-4 opacity-70" />
                    {address}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
                    <LoadingWrapper isLoading={isLoading}>
                      <div className="flex">
                        <DynamicOrganizerMap coordinates={data} />
                      </div>
                    </LoadingWrapper>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

        <AddToCalendarButton event={event} />
      </div>
    </div>
  )
}
