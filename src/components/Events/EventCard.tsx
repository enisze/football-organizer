import type { Event, ParticipantsOnEvents } from "@/prisma/generated/client";
import { trpc } from "@/src/utils/trpc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/base/Accordion";
import { Chip, Typography } from "@mui/joy";
import { filter, find } from "lodash";
import { CalendarClock, CalendarDays, Euro, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";
import { transformDate } from "../../helpers/transformDate";
import { LoadingWrapper } from "../LoadingWrapper";
import type { OrganizerMapProps } from "../Map/OrganizerMap";
import { PaymentArea } from "../PaymentArea";
import { AddToCalendarButton } from "./Buttons/AddToCalendarButton";
import { JoinEventButton } from "./Buttons/JoinEventButton";
import { LeaveEventButton } from "./Buttons/LeaveEventButton";
import { EventCardAdminArea } from "./EventCardAdminArea";
import { EventDateChip } from "./EventDateChip";
import { ParticipantsArea } from "./ParticipantsArea";
import { StatusChip } from "./StatusChip";

const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
  () => import("../Map/OrganizerMap").then((module) => module.OrganizerMap),
  {
    ssr: false,
  }
);

type EventCardProps = {
  event: Event;
  participants: ParticipantsOnEvents[];
};

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
  } = event;

  const { data: session } = useSession();

  const userStatus = find(
    participants,
    (user) => user.id === session?.user?.id
  )?.userEventStatus;

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id,
    address,
  });

  const joinedUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "JOINED"
  );
  const canceledUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "CANCELED"
  );

  console.log(userStatus);

  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-b from-purple-400  to-purple-100 p-[1px]">
      <div className="flex w-max flex-col justify-center gap-2 rounded-2xl bg-gradient-to-bl from-slate-900 to-slate-700 p-6 text-white shadow-xl ">
        <div className="flex flex-col items-center gap-y-2">
          <StatusChip status={status} />
        </div>
        <div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-bold">{transformDate(date)}</span>
          </div>
          <div className="flex items-center">
            <CalendarClock className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-bold">{[startTime, endTime].join("-")}</span>
          </div>
          <div className="flex items-center">
            <Euro className="mr-2 h-4 w-4 opacity-70" />
            <span className="font-bold">{`${
              cost / maxParticipants
            } € p.P.`}</span>
          </div>

          {data && (
            <Accordion type="single" collapsible className="p-0">
              <AccordionItem
                value="item-1"
                className="border-b-0 "
                style={{ padding: 0 }}
              >
                <AccordionTrigger className="p-0">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 opacity-70" />
                    {address}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
                    <LoadingWrapper isLoading={isLoading}>
                      <div className="flex">
                        <DynamicOrganizerMap coordinates={data} />
                        <div className="absolute top-1 right-1">
                          <EventDateChip eventDate={date} />
                        </div>
                      </div>

                      {userStatus && (
                        <div className="absolute bottom-1 right-1">
                          <Chip
                            color={
                              userStatus === "JOINED" ? "success" : "danger"
                            }
                          >
                            <Typography className="text-white">
                              Du hast{" "}
                              {userStatus === "JOINED"
                                ? "Zugesagt"
                                : "Abgesagt"}
                            </Typography>
                          </Chip>
                        </div>
                      )}
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
        <JoinEventButton id={id} />
        <LeaveEventButton id={id} />

        <AddToCalendarButton event={event} />
      </div>
    </div>
  );
};
