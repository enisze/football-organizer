import { trpc } from "@/src/utils/trpc";
import { Button } from "@/ui/base/Button";
import type { FunctionComponent } from "react";
import { LoadingWrapper } from "../../LoadingWrapper";

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const trpcContext = trpc.useContext();
  const { mutate: deleteEvent, isLoading } = trpc.event.delete.useMutation({
    onSuccess: () => trpcContext.invalidate(),
  });
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Button variant="outline" onClick={() => deleteEvent({ id })}>
        Delete
      </Button>
    </LoadingWrapper>
  );
};
