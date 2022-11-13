import { Avatar, Card, Chip, Sheet, Typography } from "@mui/joy";
import type { Event, User } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { transformDate } from "../../helpers/transformDate";
import { useIsUserParticipating } from "../../hooks/useIsUserParticipating";
import { trpc } from "../../utils/trpc";
import { LoadingWrapper } from "../LoadingWrapper";
import { OrganizerMap } from "../Map/OrganizerMap";
import { PaymentArea } from "../PaymentArea";
import { AddToCalendarButton } from "./Buttons/AddToCalendarButton";
import { JoinOrLeaveEventButton } from "./Buttons/JoinOrLeaveEventButton";
import { EventCardAdminArea } from "./EventCardAdminArea";
import { EventCardAdminPaymentArea } from "./EventCardAdminPaymentArea";

type EventCardProps = {
  event: Event;
  participants: User[];
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
}) => {
  const { address, startTime, endTime, date, id, booked } = event;
  const isUserParticipating = useIsUserParticipating(participants);
  const [showParticipants, setShowParticipants] = useState(false);

  const currentDate = new Date();
  const days = differenceInDays(date, currentDate);

  const eventString = days > 0 ? `Event in ${days} Tagen` : "Vergangenes Event";

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });

  const dateString = `${transformDate(date)} ${[startTime, endTime].join("-")}`;

  const partialString = `${participants.length}/10`;

  const participantsString = `Teilnehmer ${participants.length}/10`;

  return (
    <Card className="flex flex-col justify-center gap-2 rounded border-2 border-gray-500 bg-gray-600 p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex flex-col items-center gap-y-2">
        <Typography className="text-white">{eventString}</Typography>

        <Chip color={booked ? "success" : "danger"}>
          {booked
            ? "Findet statt (Gebucht!)"
            : `Nicht gebucht! ${partialString}`}
        </Chip>
      </div>
      <Sheet variant="outlined" sx={{ p: 4 }}>
        {data && (
          <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
            <LoadingWrapper isLoading={isLoading}>
              <OrganizerMap coordinates={data} />
            </LoadingWrapper>
          </div>
        )}
        <Typography className=" text-sm text-gray-700 md:text-lg">
          Wo: <span className="font-bold">{address}</span>
        </Typography>
        <Typography className="text-sm text-gray-600 md:text-lg">
          Wann: <span className="font-bold">{dateString}</span>
        </Typography>
      </Sheet>
      <Typography
        variant="soft"
        color={"info"}
        sx={{ cursor: "pointer" }}
        onClick={() => setShowParticipants(!showParticipants)}
      >
        {participantsString}
      </Typography>
      {showParticipants &&
        map(participants, (participant) => {
          return (
            <div key={participant.id} className="flex items-center gap-x-2">
              <Avatar />
              <div>{participant.name}</div>
              <EventCardAdminPaymentArea eventId={id} userId={participant.id} />
            </div>
          );
        })}
      <EventCardAdminArea eventId={id} />
      <JoinOrLeaveEventButton
        id={id}
        isUserParticipating={isUserParticipating}
      />

      <AddToCalendarButton event={event} />
      <PaymentArea eventId={event.id} bookingDate={event.bookingDate} />
    </Card>
  );
};
