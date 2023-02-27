import { trpc } from "@/src/utils/trpc";
import { Button } from "@/ui/base/Button";
import { TRPCError } from "@trpc/server";
import type { FunctionComponent } from "react";
import { LoadingWrapper } from "../../LoadingWrapper";

export const JoinEventButton: FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const trpcContext = trpc.useContext();

  const { mutateAsync: joinEvent, isLoading: loadingJoin } =
    trpc.event.join.useMutation({
      onSuccess: () => {
        trpcContext.invalidate();
      },
    });

  const join = async () => {
    try {
      await joinEvent({ eventId: id });
    } catch (error) {
      if (error instanceof TRPCError) {
        error.code === "PRECONDITION_FAILED";
      }
      alert("Leider ist kein Platz mehr frei :( ");
    }
  };

  return (
    <LoadingWrapper isLoading={loadingJoin} className="self-center">
      <Button variant="outline" onClick={join} className="w-full">
        Zusagen
      </Button>
    </LoadingWrapper>
  );
};
