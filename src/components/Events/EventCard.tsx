import { Avatar, Button, Card, Chip, Sheet, Typography } from "@mui/joy";
import type { Event, ParticipantsOnEvents } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { filter, find, map } from "lodash";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { transformDate } from "../../helpers/transformDate";
import { trpc } from "../../utils/trpc";
import { LoadingWrapper } from "../LoadingWrapper";
import type { OrganizerMapProps } from "../Map/OrganizerMap";
import { PaymentArea } from "../PaymentArea";
import { AddToCalendarButton } from "./Buttons/AddToCalendarButton";
import { JoinOrLeaveEventButton } from "./Buttons/JoinOrLeaveEventButton";
import { EventCardAdminArea } from "./EventCardAdminArea";
import { EventCardAdminPaymentArea } from "./EventCardAdminPaymentArea";

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

//TODO: Fix get Users participating and not participating should still be allowed to move to participating
//The filtering is currentyl done wrong
// refactor this stuff
export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
}) => {
  const { address, startTime, endTime, date, id, status } = event;

  const { data: session } = useSession();

  const { data: users } = trpc.user.getUserNamesByIds.useQuery({
    ids: map(participants, (user) => user.id),
  });

  const participatingUser = find(
    participants,
    (user) => user.id === session?.user?.id
  );
  const [showParticipants, setShowParticipants] = useState(false);

  const currentDate = new Date();
  const days = differenceInDays(date, currentDate);

  const eventString = days > 0 ? `Event in ${days} Tagen` : "Vergangenes Event";

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });

  const dateString = `${transformDate(date)} ${[startTime, endTime].join("-")}`;

  const amountOfParticipants =
    filter(
      participants,
      (participant) => participant.userEventStatus === "JOINED"
    ).length ?? 0;

  const partialString = `${amountOfParticipants}/10`;

  const participantsString = `Teilnehmer ${amountOfParticipants}/10`;

  return (
    <Card className="flex flex-col justify-center gap-2 rounded border-2 border-gray-500 bg-gray-600 p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex flex-col items-center gap-y-2">
        <Typography className="text-white">{eventString}</Typography>

        <PaymentArea
          eventId={event.id}
          bookingDate={event.bookingDate}
          cost={event.cost}
        />

        <Chip
          color={
            status === "BOOKED"
              ? "success"
              : status === "CANCELED"
              ? "danger"
              : "info"
          }
        >
          {status === "BOOKED"
            ? `GEBUCHT: ${participantsString}`
            : status === "CANCELED"
            ? "ABGESAGT"
            : `NOCH NICHT GEBUCHT ${partialString}`}
        </Chip>
      </div>
      <Sheet variant="outlined" sx={{ p: 4 }}>
        {data && (
          <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
            <LoadingWrapper isLoading={isLoading}>
              <DynamicOrganizerMap coordinates={data} />
            </LoadingWrapper>
          </div>
        )}
        <Typography className=" text-sm text-gray-700 md:text-lg ">
          Wo: <span className="font-bold">{address}</span>
        </Typography>
        <Typography className="text-sm text-gray-600 md:text-lg">
          Wann: <span className="font-bold">{dateString}</span>
        </Typography>
      </Sheet>
      <Button
        variant="soft"
        color={"info"}
        className="bg-purple-300"
        onClick={() => setShowParticipants(!showParticipants)}
      >
        {participantsString}
      </Button>
      {showParticipants &&
        map(users, (participant) => {
          const id = participant?.id;

          const participantData = find(
            participants,
            (user) => participant?.id === user.id
          );

          return (
            participantData?.userEventStatus === "JOINED" && (
              <div key={id} className="flex items-center gap-x-2">
                <Avatar />
                <div>{participant?.name}</div>
                <EventCardAdminPaymentArea
                  eventId={event.id}
                  userId={id ?? ""}
                />
              </div>
            )
          );
        })}
      <EventCardAdminArea eventId={id} />
      <JoinOrLeaveEventButton
        id={id}
        isUserParticipating={Boolean(participatingUser)}
      />

      <AddToCalendarButton event={event} />
    </Card>
  );
};
