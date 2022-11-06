import { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

import { List, ListItem } from "@mui/joy";
import { map } from "lodash";
import { AdminBoard } from "./AdminBoard";
import { EventCard } from "./EventCard";

export const Dashboard: FunctionComponent = () => {
  const { data: events } = trpc.event.getAll.useQuery();
  return (
    <>
      <List>
        {map(events, (event) => {
          const { address, startDate, endDate, id, participants } = event;
          const transformDate = (date: Date) => {
            const day = Intl.DateTimeFormat("de", { weekday: "long" }).format(
              date
            );
            const time = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const dateString = date.toLocaleDateString();

            return [day, dateString, time].join(" ");
          };

          return (
            <ListItem key={id}>
              <EventCard
                address={address}
                startDate={transformDate(startDate)}
                endDate={transformDate(endDate)}
                id={id}
                participants={participants}
              />
            </ListItem>
          );
        })}
      </List>

      <AdminBoard />
    </>
  );
};