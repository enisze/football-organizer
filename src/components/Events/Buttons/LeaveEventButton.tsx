import { trpc } from "@/src/utils/trpc";
import { Button } from "@/ui/base/Button";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { LoadingWrapper } from "../../LoadingWrapper";

export const LeaveEventButton: FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const trpcContext = trpc.useContext();

  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation();

  const { mutate: leaveEvent, isLoading: loadingLeave } =
    trpc.event.leave.useMutation({
      onSuccess: () => {
        trpcContext.invalidate();
      },
    });

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id });

  const leave = async () => {
    if (!payment) {
      leaveEvent({ eventId: id });
    } else {
      setShowLeaveModal(true);
    }
  };

  return (
    <>
      <LoadingWrapper isLoading={loadingLeave} className="self-center">
        <Button variant="outline" onClick={leave} className="w-full">
          Absagen
        </Button>
      </LoadingWrapper>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          className="max-w-xs md:max-w-2xl"
        >
          <ModalClose variant="outlined" className="rounded shadow-md" />
          <h2 id="modal-title" className="pr-10 pb-3">
            Du hast bereits bezahlt, bist du dir sicher, dass du absagen willst?
          </h2>

          <div className="flex justify-center gap-x-2">
            <Button
              variant="outline"
              color="info"
              onClick={() => {
                leaveEvent({ eventId: id });

                sendEmail({ eventId: id });

                setShowLeaveModal(false);
              }}
            >
              Ja
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setShowLeaveModal(false);
              }}
            >
              Nein
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};
