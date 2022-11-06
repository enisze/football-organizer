import { Button } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../../../utils/trpc";

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: deleteEvent } = trpc.event.delete.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={async () => await deleteEvent({ id })}
    >
      Delete
    </Button>
  );
};
