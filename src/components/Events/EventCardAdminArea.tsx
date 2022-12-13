import { Button, Chip, Typography } from "@mui/joy";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { trpc } from "../../utils/trpc";
import { LoadingWrapper } from "../LoadingWrapper";
import { BookEventButton } from "./Buttons/BookEventButton";
import { DeleteEventButton } from "./Buttons/DeleteEventButton";

type EventCardAdminAreaProps = {
  eventId: string;
};

export const EventCardAdminArea: FunctionComponent<EventCardAdminAreaProps> = ({
  eventId,
}) => {
  const isAdmin = useIsAdmin();
  const trpcContext = trpc.useContext();

  const { mutateAsync: remind, isLoading: loadingRemind } =
    trpc.event.remind.useMutation({
      onSuccess: () => trpcContext.invalidate(),
    });
  const { mutateAsync: cancel, isLoading: loadingCancel } =
    trpc.event.cancel.useMutation({
      onSuccess: () => trpcContext.invalidate(),
    });

  const { data: payments, isLoading } =
    trpc.payment.getAllPaymentsForEventFromNotParticipants.useQuery(
      { eventId },
      { enabled: isAdmin }
    );

  if (!isAdmin) return null;

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        <Typography variant="soft">{"Id: " + eventId}</Typography>
        <LoadingWrapper isLoading={isLoading}>
          {payments && payments.length > 0 && (
            <>
              <Typography variant="soft">
                Bezahlt aber nicht teilgenommen
              </Typography>
              {map(payments, (payment) => {
                if (!payment || !payment?.user) return null;
                return (
                  <div key={payment.id}>
                    <div key={payment.id} className="flex items-center gap-x-2">
                      <div>{payment?.user.name}</div>
                      <div>{payment?.amount + " €"}</div>
                      <div>{payment?.paymentDate.toDateString()}</div>
                      <Chip color="success">Bezahlt</Chip>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </LoadingWrapper>
      </div>
      <DeleteEventButton id={eventId} />

      <LoadingWrapper isLoading={loadingRemind}>
        <Button
          variant="outlined"
          onClick={async () => await remind({ eventId })}
        >
          Remind
        </Button>
      </LoadingWrapper>
      <BookEventButton id={eventId} />
      <LoadingWrapper isLoading={loadingCancel}>
        <Button
          variant="outlined"
          onClick={async () => await cancel({ id: eventId })}
        >
          Cancel Event
        </Button>
      </LoadingWrapper>
    </>
  );
};
