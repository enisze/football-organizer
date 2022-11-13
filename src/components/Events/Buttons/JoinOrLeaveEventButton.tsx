import { Button } from "@mui/joy";
import { TRPCError } from "@trpc/server";
import type { FunctionComponent } from "react";
import { trpc } from "../../../utils/trpc";

export const JoinOrLeaveEventButton: FunctionComponent<{
  id: string;
  isUserParticipating: boolean;
}> = ({ id, isUserParticipating }) => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: joinEvent } = trpc.event.join.useMutation({
    onSuccess: () => {
      trpcContext.event.getAllForUser.invalidate();
      trpcContext.event.getAll.invalidate();
      trpcContext.payment.getAllForUser.invalidate();
      trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
      trpcContext.payment.getUserBalance.invalidate();
    },
  });
  const { mutateAsync: leaveEvent } = trpc.event.leave.useMutation({
    onSuccess: () => {
      trpcContext.event.getAll.invalidate();
      trpcContext.event.getAllForUser.invalidate();
      trpcContext.payment.getAllForUser.invalidate();
      trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
      trpcContext.payment.getUserBalance.invalidate();
    },
  });

  const joinOrLeave = async () => {
    if (isUserParticipating) {
      await leaveEvent({ eventId: id });
    } else {
      try {
        await joinEvent({ eventId: id });
      } catch (error) {
        if (error instanceof TRPCError) {
          error.code === "PRECONDITION_FAILED";
        }
        alert("Leider ist kein Platz mehr frei :( ");
      }
    }
  };

  return (
    <Button variant="outlined" color="primary" onClick={joinOrLeave}>
      {isUserParticipating ? "Absagen" : "Zusagen"}
    </Button>
  );
};
