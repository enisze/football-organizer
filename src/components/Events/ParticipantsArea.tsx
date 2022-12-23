import { Avatar, Button } from "@mui/joy";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import type { ParticipantsOnEvents } from "../../../prisma/generated/client";
import { trpc } from "../../utils/trpc";
import { EventCardAdminPaymentArea } from "./EventCardAdminPaymentArea";

export const ParticipantsArea: FunctionComponent<{
  participants: ParticipantsOnEvents[];
  eventId: string;
  maxParticipants?: number;
  heading: string;
}> = ({ participants, eventId, heading, maxParticipants }) => {
  const [showParticipants, setShowParticipants] = useState(false);

  const { data: users } = trpc.user.getUserNamesByIds.useQuery({
    ids: map(participants, (user) => user.id),
  });

  const amountOfParticipants = users?.length;

  const participantsString =
    heading === "Teilnehmer"
      ? `${heading} ${amountOfParticipants}/${maxParticipants}`
      : `${heading}: ${amountOfParticipants}`;
  return (
    <>
      <Button
        variant="soft"
        color="info"
        onClick={() => setShowParticipants(!showParticipants)}
        className="bg-[#89A6FB]"
      >
        {participantsString}
      </Button>
      {showParticipants &&
        map(users, (participant) => {
          return (
            <div key={participant?.id} className="flex items-center gap-x-2">
              <Avatar />
              <div>{participant?.name}</div>
              <EventCardAdminPaymentArea
                eventId={eventId}
                userId={participant?.id ?? ""}
              />
            </div>
          );
        })}
    </>
  );
};
