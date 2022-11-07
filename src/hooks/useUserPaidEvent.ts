import { isAfter, isEqual } from "date-fns";
import type { gmail_v1 } from "googleapis";
import { filter, find } from "lodash";
import { useSession } from "next-auth/react";
import { useMemo, useRef } from "react";
import { getEuroAmount } from "../helpers/getEuroAmount";
import { trpc } from "../utils/trpc";

export const useUserPaidEvent = (eventId: string) => {
  const { data: session } = useSession();

  const trpcContext = trpc.useContext();

  const { data } = trpc.gmail.listLabels.useQuery();
  const { data: allPayments } = trpc.payment.getAll.useQuery();
  const { mutate: createPayment, status } = trpc.payment.create.useMutation({
    onSuccess: () => {
      trpcContext.payment.getAll.invalidate();
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

    const paymentMissing = paymentsFromMailNotInDatabase[0];
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
  }, [allPayments, data, createPayment, eventId, session?.user?.name]);

  return isPaid;
};
