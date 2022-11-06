import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

import { List, ListItem } from "@mui/joy";
import { map } from "lodash";
import { AdminBoard } from "./AdminBoard";
import { EventCard } from "./Events/EventCard";

export const Dashboard: FunctionComponent = () => {
  const { data: events } = trpc.event.getAll.useQuery();
  return (
    <>
      <List>
        {map(events, (event) => {
          return (
            <ListItem key={event.id}>
              <EventCard event={event} participants={event.participants} />
            </ListItem>
          );
        })}
      </List>

      <AdminBoard />
    </>
  );
};
