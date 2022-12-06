import { Button, Sheet, Typography } from "@mui/joy";
import type { Event, ParticipantsOnEvents } from "@prisma/client";
import { useSession } from "next-auth/react";
import type { FunctionComponent } from "react";
import { LoginForm } from "../../components/Authentication/LoginForm";
import { EventCard } from "../../components/Events/EventCard";

import { prisma } from "../../server/db/client";
import { trpc } from "../../utils/trpc";

const EventPage: FunctionComponent<{
  event: Event;
  participants: ParticipantsOnEvents[];
}> = (props) => {
  const { event, participants } = props;

  const { status } = useSession();

  const trpcContext = trpc.useContext();

  const { mutateAsync: leaveEvent, isSuccess } = trpc.event.leave.useMutation({
    onSuccess: () => {
      trpcContext.event.getAll.invalidate();
      trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
      trpcContext.payment.getUserBalance.invalidate();
      trpcContext.user.getUserNamesByIds.invalidate();
    },
  });

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to top, #373B44, #73C8A9)",
        }}
        className="fixed -z-10 flex h-full w-full"
      />

      <div className="mx-20 flex flex-col">
        {status === "unauthenticated" ? (
          <LoginForm />
        ) : (
          <>
            <Sheet className="my-5 flex flex-col items-center justify-center gap-y-2 rounded bg-black p-5">
              <Button
                onClick={async () => await leaveEvent({ eventId: event.id })}
                variant="outlined"
              >
                Keine Emails mehr erhalten
              </Button>

              {isSuccess && (
                <Typography variant="solid" color="info">
                  Du hast dich erfolgreich abgemeldet.
                </Typography>
              )}
            </Sheet>
            <EventCard event={event} participants={participants} />
          </>
        )}
      </div>
    </>
  );
};

export default EventPage;

export async function getServerSideProps(context: any) {
  const id = context.query.eventId as string;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { participants: true },
  });

  if (!event) return null;

  const { participants, ...realEvent } = event;

  return {
    props: {
      event: realEvent,
      participants: participants,
    },
  };
}
