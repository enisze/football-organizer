import type { FunctionComponent } from "react";
import { useMemo, useState } from "react";
import { trpc } from "../../utils/trpc";

import {
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { isAfter } from "date-fns";
import { find, forEach, map, orderBy } from "lodash";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import type {
  Event,
  ParticipantsOnEvents,
} from "../../../prisma/generated/client";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { EventCard } from "../Events/EventCard";
import { LoadingWrapper } from "../LoadingWrapper";
import { OGRadioGroup } from "./OGRadioGroup";
import { currentTabState } from "./tabState";

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined;

type Filter = "all" | "joined" | "canceled";

export const Dashboard: FunctionComponent = () => {
  const { data: events, isLoading } = trpc.event.getAll.useQuery();

  const [tab, setTab] = useRecoilState(currentTabState);

  const [selectedValue, setSelectedValue] = useState<Filter>("all");
  const { data } = useSession();

  // const a = trpc.event.deleteAll.useQuery();
  // const b = trpc.user.deleteAll.useQuery();
  const isAdmin = useIsAdmin();

  const { previousEvents, upcomingEvents } = useMemo(
    () => getPreviousAndUpcomingEvents(events),
    [events]
  );

  const { joinedEvents, leftEvents } = useMemo(
    () => getUserJoinedAndLeftEvents(events, data?.user?.id),
    [events, data?.user?.id]
  );

  const filteredEvents =
    selectedValue === "all"
      ? [...joinedEvents, ...leftEvents]
      : selectedValue === "joined"
      ? joinedEvents
      : leftEvents;

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <Tabs
        className="flex w-full items-center justify-center rounded bg-transparent"
        size="lg"
        value={tab}
        onChange={(event, value) => setTab(value as number)}
      >
        <TabList variant="plain">
          <Tab color="primary" variant={tab === 0 ? "outlined" : "plain"}>
            Kommende Events
          </Tab>
          <Tab color="primary" variant={tab === 1 ? "outlined" : "plain"}>
            Deine Events
          </Tab>
          <Tab
            color="primary"
            hidden={!isAdmin}
            variant={tab === 2 ? "outlined" : "plain"}
          >
            Vergangene Events
          </Tab>
        </TabList>

        <TabPanel value={0} className="flex justify-center">
          <EventList events={upcomingEvents} isLoading={isLoading} />
        </TabPanel>
        <TabPanel value={1} className="flex justify-center">
          <div className="flex flex-col">
            <OGRadioGroup
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            <EventList events={filteredEvents} isLoading={isLoading} />
          </div>
        </TabPanel>
        <TabPanel value={2} className="flex justify-center bg-transparent">
          <EventList events={previousEvents} isLoading={isLoading} />
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
            <Typography>Keine Events</Typography>
          </div>
        )}
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
