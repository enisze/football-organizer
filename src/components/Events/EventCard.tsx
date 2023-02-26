import type { Event, ParticipantsOnEvents } from "@/prisma/generated/client";
import { trpc } from "@/src/utils/trpc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/base/Accordion";
import { Card, Chip, Sheet, Typography } from "@mui/joy";
import { filter, find } from "lodash";
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
  showActions?: boolean;
};

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
  showActions = true,
}) => {
  const { address, startTime, endTime, date, id, status, maxParticipants } =
    event;

  const { data: session } = useSession();

  const userStatus = find(
    participants,
    (user) => user.id === session?.user?.id
  )?.userEventStatus;

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });

  const joinedUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "JOINED"
  );
  const canceledUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "CANCELED"
  );

  return (
    <Card className="flex w-max flex-col justify-center gap-2 rounded border-2 bg-gray-400  p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex flex-col items-center gap-y-2">
        <StatusChip
          status={status}
          numberOfParticipants={joinedUsers.length}
          maxParticipants={maxParticipants}
        />
      </div>
      <Sheet variant="outlined" className="rounded border p-4">
        {data && (
          <>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Ort: {event.address}</AccordionTrigger>
                <AccordionContent>
                  <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
                    <LoadingWrapper isLoading={isLoading}>
                      <div className="flex">
                        <DynamicOrganizerMap coordinates={data} />
                        <div className="absolute top-1 right-1">
                          <EventDateChip eventDate={event.date} />
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
          </>
        )}
        <Typography className="text-sm text-gray-600 md:text-lg">
          Datum: <span className="font-bold">{transformDate(date)}</span>
        </Typography>
        <Typography className="text-sm text-gray-600 md:text-lg">
          Uhrzeit:{" "}
          <span className="font-bold">{[startTime, endTime].join("-")}</span>
        </Typography>

        <Typography className="text-gray-600 md:text-lg">
          Preis pro Person:
          <Typography className="font-bold">
            {`${event.cost / maxParticipants} €`}
          </Typography>
        </Typography>
      </Sheet>
      <ParticipantsArea
        eventId={event.id}
        participants={joinedUsers}
        maxParticipants={maxParticipants}
        heading="Teilnehmer"
      />
      <ParticipantsArea
        eventId={event.id}
        participants={canceledUsers}
        heading="Absagen"
      />

      <EventCardAdminArea eventId={id} />
      <PaymentArea eventId={event.id} bookingDate={event.bookingDate} />
      {Boolean(userStatus) ||
        (showActions && (
          <>
            <JoinEventButton id={id} />
            <LeaveEventButton id={id} />
          </>
        ))}

      <AddToCalendarButton event={event} />
    </Card>
  );
};
