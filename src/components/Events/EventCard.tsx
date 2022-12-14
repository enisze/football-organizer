import { Card, Chip, Sheet, Typography } from "@mui/joy";
import { filter, find } from "lodash";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import type {
  Event,
  ParticipantsOnEvents,
} from "../../../prisma/generated/client";
import { transformDate } from "../../helpers/transformDate";
import { trpc } from "../../utils/trpc";
import { currentTabState } from "../Dashboard/tabState";
import { LoadingWrapper } from "../LoadingWrapper";
import type { OrganizerMapProps } from "../Map/OrganizerMap";
import { PaymentArea } from "../PaymentArea";
import { AddToCalendarButton } from "./Buttons/AddToCalendarButton";
import { JoinOrLeaveEventButton } from "./Buttons/JoinOrLeaveEventButton";
import { EventCardAdminArea } from "./EventCardAdminArea";
import { EventDateChip } from "./EventDateChip";
import { ParticipantsArea } from "./ParticipantsArea";
import { StatusChip } from "./StatusChip";

const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
  () => import("../Map/OrganizerMap").then((module) => module.OrganizerMap),
  {
    ssr: false,
  }
);

type EventCardProps = {
  event: Event;
  participants: ParticipantsOnEvents[];
  showActions?: boolean;
};

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

const cardClassname = (upcoming?: boolean) => {
  const className =
    "flex flex-col w-max justify-center gap-2 rounded border-2  p-6 text-white shadow-xl duration-500 motion-safe:hover:scale-105";

  const previousColors = " border-gray-500 bg-gray-800";
  const upcomingColors = " border-gray-500 bg-gray-600";

  const colors = upcoming ? upcomingColors : previousColors;

  const result = className + colors;
  return result;
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  participants,
  showActions = true,
}) => {
  const { address, startTime, endTime, date, id, status } = event;

  const [tab, setTab] = useRecoilState(currentTabState);

  const isMyTab = tab === 1;

  const { data: session } = useSession();

  const userStatus = find(
    participants,
    (user) => user.id === session?.user?.id
  )?.userEventStatus;

  const { data, isLoading } = trpc.map.getLatLong.useQuery({
    id: event.id,
    address: event.address,
  });

  const joinedUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "JOINED"
  );
  const canceledUsers = filter(
    participants,
    (participant) => participant.userEventStatus === "CANCELED"
  );

  return (
    <Card className={cardClassname(isMyTab)}>
      <div className="flex flex-col items-center gap-y-2">
        <StatusChip status={status} numberOfParticipants={joinedUsers.length} />
      </div>
      <Sheet variant="outlined" className="rounded border p-4">
        {data && (
          <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
            <LoadingWrapper isLoading={isLoading}>
              <div className="flex">
                <DynamicOrganizerMap coordinates={data} />
                <div className="absolute top-1 right-1">
                  <EventDateChip eventDate={event.date} />
                </div>
              </div>

              {userStatus && (
                <div className="absolute bottom-1 right-1">
                  <Chip color={userStatus === "JOINED" ? "success" : "danger"}>
                    <Typography className="text-white">
                      Du hast{" "}
                      {userStatus === "JOINED" ? "Zugesagt" : "Abgesagt"}
                    </Typography>
                  </Chip>
                </div>
              )}
            </LoadingWrapper>
          </div>
        )}
        <Typography className="text-sm text-gray-700 md:text-lg">
          Ort: <span className="font-bold">{address}</span>
        </Typography>
        <Typography className="text-sm text-gray-600 md:text-lg">
          Datum: <span className="font-bold">{transformDate(date)}</span>
        </Typography>
        <Typography className="text-sm text-gray-600 md:text-lg">
          Uhrzeit:{" "}
          <span className="font-bold">{[startTime, endTime].join("-")}</span>
        </Typography>

        <Typography className="text-gray-600 md:text-lg">
          Preis pro Person:{" "}
          <Typography className="font-bold">
            {`${event.cost / 10} €`}
          </Typography>
        </Typography>
      </Sheet>
      <ParticipantsArea
        eventId={event.id}
        participants={joinedUsers}
        heading="Teilnehmer"
      />
      <ParticipantsArea
        eventId={event.id}
        participants={canceledUsers}
        heading="Absagen"
      />

      {userStatus && !isMyTab && (
        <Typography
          color="primary"
          className="cursor-pointer self-center"
          onClick={() => setTab(1)}
        >
          Bereits zu-/abgesagt
        </Typography>
      )}
      <EventCardAdminArea eventId={id} />
      <PaymentArea eventId={event.id} bookingDate={event.bookingDate} />
      {(!isMyTab && Boolean(userStatus)) ||
        (showActions && <JoinOrLeaveEventButton id={id} />)}

      <AddToCalendarButton event={event} />
    </Card>
  );
};
