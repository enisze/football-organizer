import { Button, Chip, Link } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

const paypalLink =
  "https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE";

export const PaymentArea: FunctionComponent<{
  eventId: string;
  bookingDate: Date | null;
}> = ({ eventId }) => {
  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      {!payment && (
        <Link href={paypalLink} underline="none" className="w-full">
          <Button variant="outlined" className="w-full">
            Bezahlen per Paypal
          </Button>
        </Link>
      )}
      {payment && (
        <div className="flex items-center gap-x-2">
          {payment?.amount + "€  am " + payment?.paymentDate.toDateString()}
          <Chip color="success">Bezahlt</Chip>
        </div>
      )}
    </div>
  );
};
