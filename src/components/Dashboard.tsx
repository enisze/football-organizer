import { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

import { map } from "lodash";

export const Dashboard: FunctionComponent = () => {
  const { data: events } = trpc.event.getAll.useQuery();
  return (
    <div>
      {map(events, (event) => {
        return (
          <div>
            <div>{event.address}</div>
            <div>{event.startDate.toDateString()}</div>
            <div>{event.endDate.toDateString()}</div>
          </div>
        );
      })}
    </div>
  );
};
