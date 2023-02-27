import { Popover, PopoverContent, PopoverTrigger } from "@/ui/base/Popover";
import { Check, Delete, Hourglass, X } from "lucide-react";
import type { FunctionComponent } from "react";
import type { EventStatus } from "../../../prisma/generated/client";

export const StatusChip: FunctionComponent<{
  status: EventStatus;
}> = ({ status }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center ">
          {status === "BOOKED" ? (
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
          <Check className="mr-2 h-4 w-4 opacity-70" />
          <span>Gebucht, und findet statt. </span>
        </div>
        <div className="flex items-center">
          <Delete className="mr-2 h-4 w-4 opacity-70" />
          <span>Abgesagt, findet sicher nicht statt.</span>
        </div>
        <div className="flex items-center">
          <Hourglass className="mr-2 h-4 w-4 opacity-70" />
          <span>Nicht gebucht, brauchen noch Teilnehmer.</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
