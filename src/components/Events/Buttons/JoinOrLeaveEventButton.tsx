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
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });
  const { mutateAsync: leaveEvent } = trpc.event.leave.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
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
      {isUserParticipating ? "Leave" : "Join"}
    </Button>
  );
};
