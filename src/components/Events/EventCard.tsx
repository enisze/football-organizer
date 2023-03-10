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
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { transformDate } from '../../helpers/transformDate'
import { LoadingWrapper } from '../LoadingWrapper'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { JoinEventButton } from './Buttons/JoinEventButton'
import { LeaveEventButton } from './Buttons/LeaveEventButton'
import { EventCardAdminArea } from './EventCardAdminArea'
import { ParticipantsArea } from './ParticipantsArea'
import { StatusChip } from './StatusChip'

// const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
//   () => import('../Map/OrganizerMap').then((module) => module.OrganizerMap),
//   {
//     ssr: false,
//   },
// )

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

  const { data: session } = useSession()

  const userStatus = participants.find(
    (user) => user.id === session?.user?.id,
  )?.userEventStatus

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id,
    address,
  })

  const joinedUsers = participants.filter(
    (participant) => participant.userEventStatus === 'JOINED',
  )
  const canceledUsers = participants.filter(
    (participant) => participant.userEventStatus === 'CANCELED',
  )

  const currentDate = new Date()
  const days = differenceInCalendarDays(date, currentDate)

  const eventString =
    days < 0 ? 'Vergangenes Event' : days === 0 ? 'Heute' : `In ${days} Tagen`

  const fullEventString = status === 'CANCELED' ? 'Abgesagt' : eventString
  const fullEventStringStyle = status === 'CANCELED' ? 'text-red-500' : 'none'

  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px]  md:w-[350px]">
      <div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 p-4 shadow-xl dark:bg-gradient-to-tl dark:from-slate-900 dark:to-slate-700 ">
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
            <StatusChip status={status} of="event" />
            <StatusChip status={userStatus ?? 'AVAILABLE'} of="user" />
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
                className="border-b-0 "
                style={{ padding: 0 }}
              >
                <AccordionTrigger className="p-0">
                  <div className="flex w-full items-center">
                    <MapPin className="mr-2 h-4 w-4 opacity-70" />
                    {address}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
                    <LoadingWrapper isLoading={isLoading}>
                      <div className="flex">
                        {/* <DynamicOrganizerMap coordinates={data} /> */}
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
          participants={joinedUsers}
          maxParticipants={maxParticipants}
          heading="Teilnehmer"
        />
        <ParticipantsArea
          eventId={id}
          participants={canceledUsers}
          heading="Absagen"
        />

        <EventCardAdminArea eventId={id} />
        <PaymentArea eventId={id} bookingDate={bookingDate} />
        <div className="flex  justify-between gap-x-2">
          <JoinEventButton id={id} />
          <LeaveEventButton id={id} />
        </div>

        <AddToCalendarButton event={event} />
      </div>
    </div>
  )
}
