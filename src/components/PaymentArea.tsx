import { Chip, Link } from "@mui/joy";
import type { FunctionComponent } from "react";
import { useUserPaidEvent } from "../hooks/useUserPaidEvent";
import { trpc } from "../utils/trpc";

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

export const PaymentArea: FunctionComponent<{
  eventId: string;
  bookingDate: Date;
}> = ({ eventId, bookingDate }) => {
  const { data: payment } = trpc.payment.get.useQuery({ eventId });
  const userPaid = useUserPaidEvent(eventId, bookingDate);

  return (
    <div className="flex justify-center">
      {!userPaid && (
        <Link variant="solid" href={paypalLink}>
          Bezahlen per Paypal
        </Link>
      )}
      {userPaid && (
        <div className="flex items-center gap-x-2">
          {payment?.amount + "€  am " + payment?.paymentDate.toDateString()}
          <Chip color="success">Bezahlt</Chip>
        </div>
      )}
    </div>
  );
};
