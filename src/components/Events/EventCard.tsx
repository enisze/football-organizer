import { Card, Chip, Sheet, Typography } from "@mui/joy";
import type { Event, User } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { find, map } from "lodash";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { transformDate } from "../../helpers/transformDate";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useIsUserParticipating } from "../../hooks/useIsUserParticipating";
import { trpc } from "../../utils/trpc";
import { PaymentArea } from "../PaymentArea";
import { AddToCalendarButton } from "./Buttons/AddToCalendarButton";
import { BookEventButton } from "./Buttons/BookEventButton";
import { DeleteEventButton } from "./Buttons/DeleteEventButton";
import { JoinOrLeaveEventButton } from "./Buttons/JoinOrLeaveEventButton";

type EventCardProps = {
  event: Event;
  participants: User[];
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
}) => {
  const { address, startTime, endTime, date, id, booked } = event;
  const isUserParticipating = useIsUserParticipating(participants);
  const isAdmin = useIsAdmin();
  const [showParticipants, setShowParticipants] = useState(false);

  const currentDate = new Date();
  const days = differenceInDays(date, currentDate);

  const eventString = days > 0 ? `Event in ${days} Tagen` : "Vergangenes Event";

  const { data: payments } = trpc.payment.getAllPaymentsForEvent.useQuery(
    { eventId: event.id },
    { enabled: isAdmin }
  );

  const { data } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });
  console.log(data);

  return (
    <Card className="flex w-[500px] flex-col justify-center gap-2 rounded border-2 border-gray-500 bg-gray-600 p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105">
      <div className="flex items-center gap-x-2">
        <Typography className="text-white">{eventString}</Typography>

        <Chip color={booked ? "success" : "danger"}>
          {booked
            ? "Findet statt (Gebucht!)"
            : "Zu wenige Teilnehmer (nicht gebucht!)"}
        </Chip>
      </div>
      <Sheet variant="outlined" sx={{ p: 4 }}>
        <Typography className="text-xl font-bold text-gray-700">
          Ort und Zeit:
        </Typography>
        <Typography className="text-lg text-gray-700">
          {"Wo: " + address}
        </Typography>
        <Typography className="text-lg text-gray-600">
          {"Wann: " +
            transformDate(date) +
            " " +
            [startTime, endTime].join("-")}
        </Typography>
      </Sheet>
      <Typography
        variant="soft"
        color={"info"}
        sx={{ cursor: "pointer" }}
        onClick={() => setShowParticipants(!showParticipants)}
      >
        Teilnehmer {participants.length}/10:
      </Typography>
      {showParticipants &&
        map(participants, (participant) => {
          const payment = find(
            payments,
            (payment) => payment.userId === participant.id
          );
          return (
            <div key={participant.id} className="flex items-center gap-x-2">
              <div>{participant.name}</div>
              {payment && (
                <>
                  <div>{payment?.amount + " €"}</div>
                  <div>{payment?.paymentDate.toDateString()}</div>
                  <Chip color="success">Bezahlt</Chip>
                </>
              )}
              {isAdmin && !payment && <Chip color="danger">Nicht bezahlt</Chip>}
            </div>
          );
        })}
      {isAdmin && (
        <>
          <Typography variant="soft">
            Bezahlt aber nicht teilgenommen
          </Typography>
          {map(payments, (payment) => {
            return (
              !isUserParticipating && (
                <div key={payment.id}>
                  <div key={payment.id} className="flex items-center gap-x-2">
                    <div>{payment?.user.name}</div>
                    <div>{payment?.amount + " €"}</div>
                    <div>{payment?.paymentDate.toDateString()}</div>
                    <Chip color="success">Bezahlt</Chip>
                  </div>
                </div>
              )
            );
          })}
        </>
      )}
      {isAdmin && <DeleteEventButton id={id} />}

      {isAdmin && <BookEventButton id={id} />}
      <JoinOrLeaveEventButton
        id={id}
        isUserParticipating={isUserParticipating}
      />

      {isUserParticipating && <AddToCalendarButton event={event} />}
      <PaymentArea eventId={event.id} />
    </Card>
  );
};
