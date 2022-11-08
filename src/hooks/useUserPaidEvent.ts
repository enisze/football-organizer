import { isAfter, isEqual } from "date-fns";
import type { gmail_v1 } from "googleapis";
import { filter, find } from "lodash";
import { useSession } from "next-auth/react";
import { useMemo, useRef } from "react";
import { getEuroAmount } from "../helpers/getEuroAmount";
import { isDateInCertainRange } from "../helpers/isDateInCertainRange";
import { trpc } from "../utils/trpc";

export const useUserPaidEvent = (eventId: string, bookingDate: Date) => {
  const { data: session } = useSession();

  const trpcContext = trpc.useContext();

  const { data } = trpc.gmail.paypalEmails.useQuery();
  const { data: allPayments } = trpc.payment.getAllForUser.useQuery();
  const { mutate: createPayment } = trpc.payment.create.useMutation({
    onSuccess: () => {
      trpcContext.payment.getAllForUser.invalidate();
      trpcContext.payment.get.invalidate();
    },
  });

  const ref = useRef(false);

  const isPaid = useMemo(() => {
    const payment = find(allPayments, (payment) => payment.eventId === eventId);

    //Already paid
    if (payment) return true;

    //Payments from mail
    const paymentsAfterNovember = filter(data, (d) => {
      if (!d.internalDate) return false;
      const paymentDate = new Date(Number(d.internalDate));
      return isAfter(paymentDate, new Date("01.11.2022"));
    });

    if (!session?.user?.name) return false;
    if (!paymentsAfterNovember) return false;

    //check if payments from mail are in payments database
    const paymentsFromMailNotInDatabase = filter(
      paymentsAfterNovember,
      (gmailPayment) => {
        if (!gmailPayment.snippet) return false;
        const amount = getEuroAmount(gmailPayment.snippet);

        const paymentDate = new Date(Number(gmailPayment.internalDate));

        const paymentFoundInDB = find(allPayments, (payment) => {
          return (
            payment.amount === amount &&
            isEqual(payment.paymentDate, paymentDate)
          );
        });

        return !Boolean(paymentFoundInDB);
      }
    ) as gmail_v1.Schema$Message[];

    const filteredPaymentsByEventDate = filter(
      paymentsFromMailNotInDatabase,
      (payment) => {
        if (!payment.internalDate) return false;

        const paymentDate = new Date(Number(payment.internalDate));
        console.log(paymentDate);

        console.log(isDateInCertainRange(paymentDate, bookingDate));
        return isDateInCertainRange(paymentDate, bookingDate);
      }
    );

    const paymentMissing = filteredPaymentsByEventDate[0];
    if (!paymentMissing?.snippet) return false;

    const amount = getEuroAmount(paymentMissing.snippet);
    if (!paymentMissing.internalDate) return false;

    //Payment created
    if (!ref.current) {
      createPayment({
        eventId,
        amount,
        paymentDate: new Date(Number(paymentMissing.internalDate)),
      });
      ref.current = true;
    }

    return true;
  }, [
    allPayments,
    data,
    createPayment,
    eventId,
    session?.user?.name,
    bookingDate,
  ]);

  return isPaid;
};
