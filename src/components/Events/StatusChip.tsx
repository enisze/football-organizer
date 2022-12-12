import { Chip } from "@mui/joy";
import type { EventStatus } from "@prisma/client";
import type { FunctionComponent } from "react";

export const StatusChip: FunctionComponent<{
  numberOfParticipants: number;
  status: EventStatus;
}> = ({ numberOfParticipants, status }) => {
  const label = `${numberOfParticipants}/10`;

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
        ? `GEBUCHT: ${label}`
        : status === "CANCELED"
        ? "ABGESAGT"
        : `NOCH NICHT GEBUCHT ${label}`}
    </Chip>
  );
};
