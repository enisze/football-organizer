import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { TRPCError } from "@trpc/server";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";

export const JoinOrLeaveEventButton: FunctionComponent<{
  id: string;
  isUserParticipating: boolean;
}> = ({ id, isUserParticipating }) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const trpcContext = trpc.useContext();
  const { mutateAsync: joinEvent } = trpc.event.join.useMutation({
    onSuccess: () => {
      trpcContext.event.getAll.invalidate();
      trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
      trpcContext.payment.getUserBalance.invalidate();
    },
  });
  const { mutateAsync: leaveEvent } = trpc.event.leave.useMutation({
    onSuccess: () => {
      trpcContext.event.getAll.invalidate();
      trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
      trpcContext.payment.getUserBalance.invalidate();
    },
  });

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id });

  const joinOrLeave = async () => {
    if (isUserParticipating) {
      if (!payment) {
        await leaveEvent({ eventId: id });
      } else {
        setShowLeaveModal(true);
      }
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
    <>
      <Button variant="outlined" color="primary" onClick={joinOrLeave}>
        {isUserParticipating ? "Absagen" : "Zusagen"}
      </Button>
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
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            className="pr-10 pb-3"
          >
            Du hast bereits bezahlt, bist du dir sicher, dass du absagen willst?
          </Typography>

          <div className="flex justify-center gap-x-2">
            <Button
              variant="outlined"
              color="info"
              onClick={async () => {
                await leaveEvent({ eventId: id });

                setShowLeaveModal(false);
              }}
            >
              Ja
            </Button>

            <Button
              variant="outlined"
              color="primary"
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
