import { Chip } from "@mui/joy";
import type { FunctionComponent } from "react";
import type { EventStatus } from "../../../prisma/generated/client";

export const StatusChip: FunctionComponent<{
  numberOfParticipants: number;
  maxParticipants: number;
  status: EventStatus;
}> = ({ numberOfParticipants, status, maxParticipants }) => {
  const label = `${numberOfParticipants}/${maxParticipants}`;

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
