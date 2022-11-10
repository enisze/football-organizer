import { Card, Chip, Sheet, Typography } from "@mui/joy";
import type { Event, User } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { transformDate } from "../../helpers/transformDate";
import { useIsUserParticipating } from "../../hooks/useIsUserParticipating";
import { trpc } from "../../utils/trpc";
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

  const { data } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });

  return (
    <Card className="flex w-[500px] flex-col justify-center gap-2 rounded border-2 border-gray-500 bg-gray-600 p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex items-center gap-x-2">
        <Typography className="text-white">{eventString}</Typography>

        <Chip color={booked ? "success" : "danger"}>
          {booked
            ? "Findet statt (Gebucht!)"
            : "Zu wenige Teilnehmer (nicht gebucht!)"}
        </Chip>
      </div>
      <Sheet variant="outlined" sx={{ p: 4 }}>
        <Typography className="text-xl font-bold text-gray-700">
          Ort und Zeit:
        </Typography>

        {data && (
          <div className="relative h-[250px] w-[350px]">
            <OrganizerMap coordinates={data} />
          </div>
        )}
        <Typography className="text-lg text-gray-700">
          {"Wo: " + address}
        </Typography>
        <Typography className="text-lg text-gray-600">
          {"Wann: " +
            transformDate(date) +
            " " +
            [startTime, endTime].join("-")}
        </Typography>
      </Sheet>
      <Typography
        variant="soft"
        color={"info"}
        sx={{ cursor: "pointer" }}
        onClick={() => setShowParticipants(!showParticipants)}
      >
        Teilnehmer {participants.length}/10:
      </Typography>
      {showParticipants &&
        map(participants, (participant) => {
          return (
            <div key={participant.id} className="flex items-center gap-x-2">
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
      <PaymentArea eventId={event.id} bookingDate={event.date} />
    </Card>
  );
};
