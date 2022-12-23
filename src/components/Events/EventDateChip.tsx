import { Chip } from "@mui/joy";
import { differenceInDays } from "date-fns";
import type { FunctionComponent } from "react";

export const EventDateChip: FunctionComponent<{
  eventDate: Date;
}> = ({ eventDate }) => {
  const currentDate = new Date();
  const days = differenceInDays(eventDate, currentDate);

  const isPastEvent = days < 0;

  const eventString = isPastEvent ? "Vergangenes Event" : `In ${days} Tagen`;
  return <Chip color={isPastEvent ? "danger" : "info"}>{eventString}</Chip>;
};
