import { Button } from "@mui/joy";
import type { Event } from "@prisma/client";
import type { CalendarOptions } from "datebook";
import { ICalendar } from "datebook";
import type { FunctionComponent } from "react";

export const AddToCalendarButton: FunctionComponent<{ event: Event }> = ({
  event,
}) => {
  const [startHours, startMinutes] = event.startTime.split(":");
  const [endHours, endMinutes] = event.endTime.split(":");

  const start = new Date(event.date);
  const end = new Date(event.date);

  start.setHours(Number(startHours), Number(startMinutes));
  end.setHours(Number(endHours), Number(endMinutes));

  const options: CalendarOptions = {
    title: "Fußball",
    location: event.address,
    description:
      "Das (hoffentlich) wöchentliche Cl-Finale! Spiel und Spass vorprogrammiert. Lets go.",
    start: start,
    end: end,
  };
  const icalendar = new ICalendar(options);

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        icalendar.download("fussball.ics");
      }}
    >
      Zum Kalender hinzufügen
    </Button>
  );
};
