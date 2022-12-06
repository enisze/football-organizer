import { Chip } from "@mui/joy";
import type { EventStatus } from "@prisma/client";
import type { FunctionComponent } from "react";

export const StatusChip: FunctionComponent<{
  bookedString: string;
  notbookedString: string;
  status: EventStatus;
}> = ({ bookedString, notbookedString, status }) => {
  return (
    <Chip
      color={
        status === "BOOKED"
          ? "success"
          : status === "CANCELED"
          ? "danger"
          : "info"
      }
    >
      {status === "BOOKED"
        ? `GEBUCHT: ${bookedString}`
        : status === "CANCELED"
        ? "ABGESAGT"
        : `NOCH NICHT GEBUCHT ${notbookedString}`}
    </Chip>
  );
};
