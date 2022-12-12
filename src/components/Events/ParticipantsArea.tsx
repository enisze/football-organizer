import { Avatar, Button } from "@mui/joy";
import type { ParticipantsOnEvents } from "@prisma/client";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { EventCardAdminPaymentArea } from "./EventCardAdminPaymentArea";

export const ParticipantsArea: FunctionComponent<{
  participants: ParticipantsOnEvents[];
  eventId: string;
  heading: string;
}> = ({ participants, eventId, heading }) => {
  const [showParticipants, setShowParticipants] = useState(false);

  const { data: users } = trpc.user.getUserNamesByIds.useQuery({
    ids: map(participants, (user) => user.id),
  });

  const amountOfParticipants = users?.length;

  const participantsString =
    heading === "Teilnehmer"
      ? `${heading} ${amountOfParticipants}/10`
      : `${heading}: ${amountOfParticipants}`;
  return (
    <>
      <Button
        variant="soft"
        color={"info"}
        className="bg-purple-300"
        onClick={() => setShowParticipants(!showParticipants)}
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
