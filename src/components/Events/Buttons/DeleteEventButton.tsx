import { Button } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../../../utils/trpc";
import { LoadingWrapper } from "../../LoadingWrapper";

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: deleteEvent, isLoading } = trpc.event.delete.useMutation(
    {
      onSuccess: () => trpcContext.event.getAll.invalidate(),
    }
  );
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Button
        variant="outlined"
        color="primary"
        onClick={async () => await deleteEvent({ id })}
      >
        Delete
      </Button>
    </LoadingWrapper>
  );
};
