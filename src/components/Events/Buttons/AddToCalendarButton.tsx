import type { Event } from "@/prisma/generated/client";
import { Button } from "@/ui/base/Button";
import { Modal, ModalClose, ModalDialog, Sheet, Typography } from "@mui/joy";
import type { CalendarOptions } from "datebook";
import { GoogleCalendar, ICalendar, OutlookCalendar } from "datebook";
import type { FunctionComponent } from "react";
import { useState } from "react";

export const AddToCalendarButton: FunctionComponent<{ event: Event }> = ({
  event,
}) => {
  const [open, setOpen] = useState(false);
  const [startHours, startMinutes] = event.startTime.split(":");
  const [endHours, endMinutes] = event.endTime.split(":");

  const start = new Date(event.date);
  const end = new Date(event.date);

  start.setHours(Number(startHours), Number(startMinutes));
  end.setHours(Number(endHours), Number(endMinutes));

  const options: CalendarOptions = {
    title: "Fußball",
    location: event.address,
    description:
      "Das (hoffentlich) wöchentliche Cl-Finale! Spiel und Spass vorprogrammiert. Lets go.",
    start: start,
    end: end,
  };
  const icalendar = new ICalendar(options);
  const googleCalendar = new GoogleCalendar(options);
  const outlookCalendar = new OutlookCalendar(options);

  const googleLink = googleCalendar.render();
  const outlookLink = outlookCalendar.render();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        Zum Kalender hinzufügen
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
        >
          <ModalClose variant="outlined" className="rounded shadow-md" />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Kalender wählen
          </Typography>

          <Sheet className="flex flex-col gap-y-2">
            <Button
              variant="subtle"
              className="bg-[#73C8A9]"
              onClick={() => {
                icalendar.download();
              }}
            >
              ICal Kalendar
            </Button>
            <Button
              variant="subtle"
              className="bg-[#73C8A9]"
              onClick={() => {
                window.open(googleLink);
              }}
            >
              Google Kalendar
            </Button>

            <Button
              variant="subtle"
              className="bg-[#73C8A9]"
              onClick={() => {
                window.open(outlookLink);
              }}
            >
              Outlook Kalendar
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
};
