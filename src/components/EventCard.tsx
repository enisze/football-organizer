import { Button } from "@mui/joy";
import { User } from "@prisma/client";
import { map } from "lodash";
import { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

type EventCardProps = {
  address: string;
  startDate: string;
  endDate: string;
  id: string;
  participants: User[];
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  address,
  startDate,
  endDate,
  id,
  participants,
}) => {
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
  return (
    <section className="flex cursor-pointer flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{address}</h2>
      <p className="text-sm text-gray-600">{startDate}</p>
      <p className="text-sm text-gray-600">{endDate}</p>
      {map(participants, (participant) => {
        return <div>{participant.email}</div>;
      })}
      <Button
        variant="outlined"
        color="primary"
        onClick={async () => deleteEvent({ id })}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={async () => joinEvent({ eventId: id })}
      >
        Join
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={async () => leaveEvent({ eventId: id })}
      >
        Leave
      </Button>
    </section>
  );
};
