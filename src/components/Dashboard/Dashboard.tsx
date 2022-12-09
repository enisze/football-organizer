import type { FunctionComponent } from "react";
import { useMemo, useState } from "react";
import { trpc } from "../../utils/trpc";

import { List, ListItem, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import type { Event, ParticipantsOnEvents } from "@prisma/client";
import { isAfter } from "date-fns";
import { find, forEach, map, orderBy } from "lodash";
import { useSession } from "next-auth/react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { EventCard } from "../Events/EventCard";
import { LoadingWrapper } from "../LoadingWrapper";
import { AdminBoard } from "./AdminBoard";

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined;

export const Dashboard: FunctionComponent = () => {
  const { data: events, isLoading } = trpc.event.getAll.useQuery();
  const [index, setIndex] = useState(1);
  const [index2, setIndex2] = useState(1);

  const { data } = useSession();

  // const a = trpc.event.deleteAll.useQuery();
  // const b = trpc.user.deleteAll.useQuery();
  const isAdmin = useIsAdmin();

  const { previousEvents, upcomingEvents } = useMemo(
    () => getPreviousAndUpcomingEvents(events, data?.user?.id),
    [events, data?.user?.id]
  );

  const { joinedEvents, leftEvents } = useMemo(
    () => getUserJoinedAndLeftEvents(events, data?.user?.id),
    [events, data?.user?.id]
  );

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      {isAdmin && <AdminBoard />}

      <Tabs
        className="flex w-full items-center justify-center rounded bg-transparent"
        size="lg"
        defaultValue={1}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList variant="plain">
          <Tab color="primary" variant={index === 0 ? "outlined" : "plain"}>
            Vergangene Events
          </Tab>

          <Tab color="primary" variant={index === 1 ? "outlined" : "plain"}>
            Kommende Events
          </Tab>
          <Tab color="primary" variant={index === 2 ? "outlined" : "plain"}>
            Deine Events
          </Tab>
        </TabList>

        <TabPanel value={0} className="flex justify-center bg-transparent">
          <EventList events={previousEvents} isLoading={isLoading} />
        </TabPanel>
        <TabPanel value={1} className="flex justify-center">
          <EventList events={upcomingEvents} isLoading={isLoading} />
        </TabPanel>
        <TabPanel value={2} className="flex justify-center">
          <Tabs
            className="flex w-full items-center justify-center rounded bg-transparent"
            size="lg"
            defaultValue={1}
            onChange={(event, value) => setIndex2(value as number)}
          >
            <TabList>
              <Tab
                color="primary"
                variant={index2 === 0 ? "outlined" : "plain"}
              >
                Abgesagt
              </Tab>
              <Tab
                color="primary"
                variant={index2 === 1 ? "outlined" : "plain"}
              >
                Zugesagt
              </Tab>
            </TabList>

            <TabPanel value={0} className="flex justify-center bg-transparent">
              <EventList events={leftEvents} isLoading={isLoading} />
            </TabPanel>
            <TabPanel value={1} className="flex justify-center">
              <EventList events={joinedEvents} isLoading={isLoading} />
            </TabPanel>
          </Tabs>
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

const getPreviousAndUpcomingEvents = (
  events: EventsWithparticipants,
  id: string | undefined
) => {
  const previousEvents: EventsWithparticipants = [];
  const upcomingEvents: EventsWithparticipants = [];

  const currentDate = new Date();

  forEach(events, (event) => {
    const res = find(event.participants, (participant) => {
      return participant.id === id;
    });
    if (!res) {
      if (isAfter(event.date, currentDate)) {
        upcomingEvents.push(event);
      } else {
        previousEvents.push(event);
      }
    }
  });

  const sortedPreviousEvents = orderBy(previousEvents, ["date"], ["desc"]);
  const sortedUpcomingEvents = orderBy(upcomingEvents, ["date"], ["asc"]);

  return {
    previousEvents: sortedPreviousEvents,
    upcomingEvents: sortedUpcomingEvents,
  };
};

const getUserJoinedAndLeftEvents = (
  events: EventsWithparticipants,
  id: string | undefined
) => {
  if (!id) return { joinedEvents: [], leftEvents: [] };
  const joined: EventsWithparticipants = [];
  const left: EventsWithparticipants = [];

  forEach(events, (event) => {
    const res = find(event.participants, (participant) => {
      return participant.id === id;
    });

    if (res?.userEventStatus === "JOINED") {
      joined.push(event);
    }
    if (res?.userEventStatus === "CANCELED") {
      left.push(event);
    }
  });

  const sortedJoinedEvents = orderBy(joined, ["date"], ["asc"]);
  const sortedLeftEvents = orderBy(left, ["date"], ["asc"]);

  return {
    joinedEvents: sortedJoinedEvents,
    leftEvents: sortedLeftEvents,
  };
};
