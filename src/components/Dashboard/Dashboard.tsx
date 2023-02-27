import type { FunctionComponent } from "react";
import { trpc } from "../../utils/trpc";

import { List, ListItem } from "@mui/joy";
import { map } from "lodash";
import type {
  Event,
  ParticipantsOnEvents,
} from "../../../prisma/generated/client";
import { EventCard } from "../Events/EventCard";
import { LoadingWrapper } from "../LoadingWrapper";

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined;

export const Dashboard: FunctionComponent = () => {
  const { data: events, isLoading } = trpc.event.getAll.useQuery();

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <EventList events={events} isLoading={isLoading} />
    </div>
  );
};

const EventList: FunctionComponent<{
  events: EventsWithparticipants;
  isLoading: boolean;
}> = ({ events, isLoading }) => {
  return (
    <LoadingWrapper isLoading={isLoading} className="flex justify-center">
      <List>
        {events && events?.length > 0 ? (
          map(events, (event) => {
            const { participants, ...realEvent } = event;
            return (
              <ListItem key={realEvent.id}>
                <EventCard event={realEvent} participants={participants} />
              </ListItem>
            );
          })
        ) : (
          <div className="flex justify-center">
            <span>Keine Events</span>
          </div>
        )}
      </List>
    </LoadingWrapper>
  );
};
