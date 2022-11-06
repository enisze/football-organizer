import { Chip, Sheet, Typography } from "@mui/joy";
import type { Event, User } from "@prisma/client";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { transformDate } from "../../helpers/transformDate";
import { useIsUserParticipating } from "../../hooks/useIsUserParticipating";
import { BookEventButton } from "./Buttons/BookEventButton";
import { DeleteEventButton } from "./Buttons/DeleteEventButton";
import { JoinOrLeaveEventButton } from "./Buttons/JoinOrLeaveEventButton";

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

  return (
    <section className="flex flex-col justify-center gap-2 rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex items-center gap-x-2">
        <Typography>Event</Typography>

        <Chip color={booked ? "success" : "danger"}>
          {booked
            ? "Findet statt (Gebucht!)"
            : "Zu wenige Teilnehmer (nicht gebucht!)"}
        </Chip>
      </div>
      <Sheet variant="outlined" sx={{ p: 4 }}>
        <Typography className="text-lg text-gray-700">Ort und Zeit:</Typography>
        <Typography className="text-lg text-gray-700">{address}</Typography>
        <Typography className="text-sm text-gray-600">
          {transformDate(date) + " " + [startTime, endTime].join("-")}
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
          return <div>{participant.email}</div>;
        })}
      <DeleteEventButton id={id} />

      <BookEventButton id={id} />
      <JoinOrLeaveEventButton
        id={id}
        isUserParticipating={isUserParticipating}
      />
    </section>
  );
};
