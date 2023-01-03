import { Button } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../../../utils/trpc";
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
      <Button variant="outlined" onClick={() => deleteEvent({ id })}>
        Delete
      </Button>
    </LoadingWrapper>
  );
};
