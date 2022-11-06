import { Button, Chip, Sheet, Typography } from "@mui/joy";
import type { Event, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { map, reduce } from "lodash";
import { useSession } from "next-auth/react";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

type EventCardProps = {
  event: Event;
  participants: User[];
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
}) => {
  const { address, startTime, endTime, date, id, booked } = event;

  const trpcContext = trpc.useContext();
  const { mutateAsync: deleteEvent } = trpc.event.delete.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });
  const { mutateAsync: joinEvent } = trpc.event.join.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });
  const { mutateAsync: leaveEvent } = trpc.event.leave.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });

  const { mutateAsync: bookEvent } = trpc.event.book.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });

  const isUserParticipating = useIsUserParticipating(participants);

  const [showParticipants, setShowParticipants] = useState(false);

  const joinOrLeave = async () => {
    if (isUserParticipating) {
      await leaveEvent({ eventId: id });
    } else {
      try {
        await joinEvent({ eventId: id });
      } catch (error) {
        if (error instanceof TRPCError) {
          error.code === "PRECONDITION_FAILED";
        }
        alert("Leider ist kein Platz mehr frei :( ");
      }
    }
  };

  return (
    <section className="flex flex-col justify-center gap-2 rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex items-center gap-x-2">
        <Typography>Event</Typography>

        <Chip color={booked ? "success" : "danger"}>
          {booked ? "Gebucht" : "Zu wenige Teilnehmer (nicht gebucht!)"}
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
      <Button
        variant="outlined"
        color="primary"
        onClick={async () => await deleteEvent({ id })}
      >
        Delete
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={async () => await bookEvent({ id })}
      >
        Book
      </Button>
      <Button variant="outlined" color="primary" onClick={joinOrLeave}>
        {isUserParticipating ? "Leave" : "Join"}
      </Button>
    </section>
  );
};

const transformDate = (date: Date) => {
  const day = Intl.DateTimeFormat("de", { weekday: "long" }).format(date);
  const dateString = date.toLocaleDateString();

  return [day, dateString].join(" ");
};

const useIsUserParticipating = (participants: User[]) => {
  const { data } = useSession();
  if (!data?.user?.email) return false;
  return reduce(
    participants,
    (acc: string[], participant) => {
      if (participant.email) {
        return [...acc, participant.email];
      }
      return acc;
    },
    []
  ).includes(data.user.email);
};
