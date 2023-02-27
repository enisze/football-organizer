import { Popover, PopoverContent, PopoverTrigger } from "@/ui/base/Popover";
import { Check, Hourglass, X } from "lucide-react";
import type { FunctionComponent } from "react";
import type {
  EventStatus,
  UserEventStatus,
} from "../../../prisma/generated/client";

export const StatusChip: FunctionComponent<{
  status: EventStatus | UserEventStatus;
  of: "event" | "user";
}> = ({ status, of }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center ">
          <span>{of === "user" ? "Teilnahme" : "Event"}</span>
          {status === "BOOKED" || status === "JOINED" ? (
            <>
              <Check className="h-6 w-6 text-green-500" />
            </>
          ) : status === "CANCELED" ? (
            <X className="h-6 w-6 text-red-500" />
          ) : (
            <>
              <Hourglass className="h-6 w-6" />
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500 opacity-70" />
          {of === "event" ? (
            <span>Gebucht, und findet statt. </span>
          ) : (
            <span>Du nimmst teil.</span>
          )}
        </div>
        <div className="flex items-center">
          <X className="mr-2 h-4 w-4 text-red-500 opacity-70" />

          {of === "event" ? (
            <span>Abgesagt, findet sicher nicht statt.</span>
          ) : (
            <span>Du hast abgesagt.</span>
          )}
        </div>
        <div className="flex items-center">
          <Hourglass className="mr-2 h-4 w-4 opacity-70" />

          {of === "event" ? (
            <span>Nicht gebucht, brauchen noch Teilnehmer.</span>
          ) : (
            <span>Du hast weder zu- noch abgesagt.</span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
