import { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

import { List, ListItem } from "@mui/joy";
import { map } from "lodash";
import { AdminBoard } from "./AdminBoard";

export const Dashboard: FunctionComponent = () => {
  const { data: events } = trpc.event.getAll.useQuery();
  return (
    <>
      <List>
        {map(events, (event) => {
          return (
            <ListItem>
              <div>
                <div>{event.address}</div>
                <div>{event.startDate.toDateString()}</div>
                <div>{event.endDate.toDateString()}</div>
              </div>
            </ListItem>
          );
        })}
      </List>

      <AdminBoard />
    </>
  );
};
