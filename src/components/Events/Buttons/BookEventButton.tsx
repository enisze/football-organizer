import { Button } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../../../utils/trpc";

export const BookEventButton: FunctionComponent<{ id: string }> = ({ id }) => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: bookEvent } = trpc.event.book.useMutation({
    onSuccess: () => trpcContext.event.getAll.invalidate(),
  });
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={async () => await bookEvent({ id })}
    >
      Book
    </Button>
  );
};
