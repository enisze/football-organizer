import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { TRPCError } from "@trpc/server";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { LoadingWrapper } from "../../LoadingWrapper";

export const JoinOrLeaveEventButton: FunctionComponent<{
  id: string;
  isUserParticipating: boolean;
}> = ({ id, isUserParticipating }) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const trpcContext = trpc.useContext();

  const [userParticipating, setUserParticipating] =
    useState(isUserParticipating);

  const { mutateAsync: joinEvent, isLoading: loadingJoin } =
    trpc.event.join.useMutation({
      onSuccess: () => {
        trpcContext.event.getAll.invalidate();
        trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
        trpcContext.payment.getUserBalance.invalidate();
        trpcContext.user.getUserNamesByIds.invalidate();
      },
    });
  const { mutateAsync: leaveEvent, isLoading: loadingLeave } =
    trpc.event.leave.useMutation({
      onSuccess: () => {
        trpcContext.event.getAll.invalidate();
        trpcContext.payment.getAllPaymentsForEventFromNotParticipants.invalidate();
        trpcContext.payment.getUserBalance.invalidate();
        trpcContext.user.getUserNamesByIds.invalidate();
      },
    });

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id });

  const joinOrLeave = async () => {
    if (isUserParticipating) {
      if (!payment) {
        await leaveEvent({ eventId: id });
        setUserParticipating(false);
      } else {
        setShowLeaveModal(true);
      }
    } else {
      try {
        await joinEvent({ eventId: id });
        setUserParticipating(true);
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
        <Button variant="outlined" color="primary" onClick={joinOrLeave}>
          {userParticipating ? "Absagen" : "Zusagen"}
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
