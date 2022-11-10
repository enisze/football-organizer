import { Chip, Typography } from "@mui/joy";
import { map } from "lodash";
import type { FunctionComponent } from "react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { trpc } from "../../utils/trpc";
import { BookEventButton } from "./Buttons/BookEventButton";
import { DeleteEventButton } from "./Buttons/DeleteEventButton";

type EventCardAdminAreaProps = {
  eventId: string;
};

export const EventCardAdminArea: FunctionComponent<EventCardAdminAreaProps> = ({
  eventId,
}) => {
  const isAdmin = useIsAdmin();

  const { data: payments } =
    trpc.payment.getAllPaymentsForEventFromNotParticipants.useQuery(
      { eventId },
      { enabled: isAdmin }
    );

  if (!isAdmin) return null;

  return (
    <>
      <>
        <Typography variant="soft">Bezahlt aber nicht teilgenommen</Typography>
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
      <DeleteEventButton id={eventId} />
      <BookEventButton id={eventId} />
    </>
  );
};
