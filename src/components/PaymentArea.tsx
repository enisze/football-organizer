import { Link } from "@mui/joy";
import { FunctionComponent } from "react";
import { useUserPaidEvent } from "../hooks/useUserPaidEvent";
import { trpc } from "../utils/trpc";

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

export const PaymentArea: FunctionComponent<{ eventId: string }> = ({
  eventId,
}) => {
  const { data: payment } = trpc.payment.get.useQuery({ eventId });
  const userPaid = useUserPaidEvent(eventId);

  return (
    <>
      {!userPaid && (
        <div className="flex justify-center">
          <Link href={paypalLink}>Bezahlen per Paypal</Link>
        </div>
      )}
      {userPaid && (
        <div>{payment?.amount + " " + payment?.paymentDate.toDateString()}</div>
      )}
    </>
  );
};
