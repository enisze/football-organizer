import type { Event, ParticipantsOnEvents } from "@prisma/client";
import type { FunctionComponent } from "react";
import { EventCard } from "../../components/Events/EventCard";

import { prisma } from "../../server/db/client";

const EventPage: FunctionComponent<{
  event: Event;
  participants: ParticipantsOnEvents[];
}> = (props) => {
  const { event, participants } = props;

  return (
    <div className="m-20">
      <EventCard event={event} participants={participants} />;
    </div>
  );
};

export default EventPage;

export async function getServerSideProps(context: any) {
  const id = context.query.eventId as string;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { participants: true },
  });

  if (!event) return null;

  const { participants, ...realEvent } = event;

  return {
    props: {
      event: realEvent,
      participants: participants,
    },
  };
}
