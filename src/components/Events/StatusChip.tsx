import type { FunctionComponent } from "react";
import type { EventStatus } from "../../../prisma/generated/client";

export const StatusChip: FunctionComponent<{
  numberOfParticipants: number;
  maxParticipants: number;
  status: EventStatus;
}> = ({ numberOfParticipants, status, maxParticipants }) => {
  const label = `${numberOfParticipants}/${maxParticipants}`;

  return (
    <div className="rounded text-white">
      {status === "BOOKED"
        ? `GEBUCHT: ${label}`
        : status === "CANCELED"
        ? "ABGESAGT"
        : `NOCH NICHT GEBUCHT ${label}`}
    </div>
  );
};
