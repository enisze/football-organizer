import { FunctionComponent, useMemo } from "react";
import { trpc } from "../../utils/trpc";

import { List, ListItem, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import type { Event, ParticipantsOnEvents } from "@prisma/client";
import { isAfter } from "date-fns";
import { forEach, map, orderBy } from "lodash";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { EventCard } from "../Events/EventCard";
import { LoadingWrapper } from "../LoadingWrapper";
import { AdminBoard } from "./AdminBoard";

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined;

export const Dashboard: FunctionComponent = () => {
  const { data: events, isLoading } = trpc.event.getAll.useQuery();

  // const a = trpc.event.deleteAll.useQuery();
  // const b = trpc.user.deleteAll.useQuery();
  const isAdmin = useIsAdmin();

  const { previousEvents, upcomingEvents } = useMemo(
    () => getPreviousAndUpcomingEvents(events),
    [events]
  );

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      {isAdmin && <AdminBoard />}

      <Tabs
        defaultValue={1}
        className="flex w-full items-center justify-center rounded bg-transparent"
      >
        <TabList variant="soft" color="neutral">
          <Tab value={0}>Vergangene Events</Tab>
          <Tab value={1}>Kommende Events</Tab>
        </TabList>

        <TabPanel value={0} className="flex justify-center bg-transparent">
          <EventList events={previousEvents} isLoading={isLoading} />
        </TabPanel>
        <TabPanel value={1} className="flex justify-center">
          <EventList events={upcomingEvents} isLoading={isLoading} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

const EventList: FunctionComponent<{
  events: EventsWithparticipants;
  isLoading: boolean;
}> = ({ events, isLoading }) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <List>
        {map(events, (event) => {
          const { participants, ...realEvent } = event;
          return (
            <ListItem key={realEvent.id}>
              <EventCard event={realEvent} participants={participants} />
            </ListItem>
          );
        })}
      </List>
    </LoadingWrapper>
  );
};

const getPreviousAndUpcomingEvents = (events: EventsWithparticipants) => {
  const previousEvents: EventsWithparticipants = [];
  const upcomingEvents: EventsWithparticipants = [];

  const currentDate = new Date();

  forEach(events, (event) => {
    if (isAfter(event.date, currentDate)) {
      upcomingEvents.push(event);
    } else {
      previousEvents.push(event);
    }
  });

  const sortedPreviousEvents = orderBy(previousEvents, ["date"], ["desc"]);
  const sortedUpcomingEvents = orderBy(upcomingEvents, ["date"], ["asc"]);

  return {
    previousEvents: sortedPreviousEvents,
    upcomingEvents: sortedUpcomingEvents,
  };
};
