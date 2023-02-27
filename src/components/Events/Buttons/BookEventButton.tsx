import { Button } from "@/ui/base/Button";
import { TextField } from "@/ui/base/TextField";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { format } from "date-fns";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";

export const BookEventButton: FunctionComponent<{ id: string }> = ({ id }) => {
  const trpcContext = trpc.useContext();
  const { mutate: bookEvent } = trpc.event.book.useMutation({
    onSuccess: () => trpcContext.invalidate(),
  });

  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  return (
    <>
      <Button variant="outline" onClick={() => setShowBookModal(true)}>
        Book
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showBookModal}
        onClose={() => setShowBookModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          className="max-w-xs md:max-w-2xl"
        >
          <ModalClose variant="outlined" className="rounded shadow-md" />
          <h2 id="modal-title" className="pr-10 pb-3">
            Event buchen
          </h2>

          <div className="flex justify-center gap-x-2">
            <TextField
              label="Datum"
              type="date"
              name="date"
              onChange={(event) => {
                const date = new Date(event.target.value);

                setBookingDate(format(date, "yyyy-MM-dd"));
              }}
              value={bookingDate}
              text={""}
            />
            <Button
              variant="outline"
              color="info"
              onClick={() => {
                bookEvent({ id, date: new Date(bookingDate) });

                setShowBookModal(false);
              }}
            >
              Buchen
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};
