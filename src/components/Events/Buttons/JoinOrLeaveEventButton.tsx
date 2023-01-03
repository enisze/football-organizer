import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { TRPCError } from "@trpc/server";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { LoadingWrapper } from "../../LoadingWrapper";

export const JoinOrLeaveEventButton: FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const trpcContext = trpc.useContext();

  const { data: isUserParticipating } = trpc.event.isUserParticipating.useQuery(
    { id }
  );

  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation();

  const { mutate: joinEvent, isLoading: loadingJoin } =
    trpc.event.join.useMutation({
      onSuccess: () => {
        trpcContext.invalidate();
      },
    });
  const { mutate: leaveEvent, isLoading: loadingLeave } =
    trpc.event.leave.useMutation({
      onSuccess: () => {
        trpcContext.invalidate();
      },
    });

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id });

  const joinOrLeave = () => {
    if (isUserParticipating) {
      if (!payment) {
        leaveEvent({ eventId: id });
      } else {
        setShowLeaveModal(true);
      }
    } else {
      try {
        joinEvent({ eventId: id });
      } catch (error) {
        if (error instanceof TRPCError) {
          error.code === "PRECONDITION_FAILED";
        }
        alert("Leider ist kein Platz mehr frei :( ");
      }
    }
  };

  const loading = loadingJoin || loadingLeave;

  return (
    <>
      <LoadingWrapper isLoading={loading} className="self-center">
        <Button variant="outlined" onClick={joinOrLeave}>
          {isUserParticipating ? "Absagen" : "Zusagen"}
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
              onClick={() => {
                leaveEvent({ eventId: id });

                sendEmail({ eventId: id });

                setShowLeaveModal(false);
              }}
            >
              Ja
            </Button>

            <Button
              variant="outlined"
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
