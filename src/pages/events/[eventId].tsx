import { Button, Sheet, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { LoginForm } from "../../components/Authentication/LoginForm";
import { EventCard } from "../../components/Events/EventCard";
import { LoadingWrapper } from "../../components/LoadingWrapper";

import { trpc } from "../../utils/trpc";

const EventPage: FunctionComponent = () => {
  const router = useRouter();

  const id = router.query.eventId as string;

  const { data, isLoading } = trpc.event.getById.useQuery(
    { id },
    { enabled: Boolean(id) }
  );
  const { status } = useSession();

  const trpcContext = trpc.useContext();

  const { mutateAsync: leaveEvent, isSuccess } = trpc.event.leave.useMutation({
    onSuccess: () => {
      trpcContext.invalidate();
    },
  });

  if (isLoading) return <LoadingWrapper center isLoading={isLoading} />;

  if (!data) return <div>Wrong ID</div>;

  const { participants, ...event } = data;

  const url = process.env.NEXT_PUBLIC_BASE_URL as string;

  const link = new URL(url);

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
          <div className="flex flex-col items-center">
            <Sheet className="my-5 flex flex-col items-center justify-center gap-y-2 rounded bg-[#1E293B] p-5">
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
              <Link href={link}>
                <Typography>Zur Startseite</Typography>
              </Link>
            </Sheet>
            <EventCard event={event} participants={participants} />
          </div>
        )}
      </div>
    </>
  );
};

export default EventPage;
