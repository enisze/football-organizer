import type { gmail_v1 } from "googleapis";
import { filter, find } from "lodash";
import { useSession } from "next-auth/react";
import { useMemo, useRef } from "react";
import { usePromiseQueue } from "../contexts/PromiseQueueContext";
import { getEuroAmount } from "../helpers/getEuroAmount";
import { isDateInCertainRange } from "../helpers/isDateInCertainRange";
import { trpc } from "../utils/trpc";

const AMOUNT_LIST = [4.5, 5, 10, 11];

export const useUserPaidEvent = (eventId: string, bookingDate: Date | null) => {
  const { data: session } = useSession();

  const { queue } = usePromiseQueue();

  const trpcContext = trpc.useContext();

  const { data } = trpc.gmail.paypalEmails.useQuery();
  const { data: allPayments } = trpc.payment.getAllForUser.useQuery();
  const { mutateAsync: createPayment } = trpc.payment.create.useMutation({
    onSuccess: () => {
      trpcContext.payment.getAllForUser.invalidate();
      trpcContext.payment.getByEventId.invalidate();
    },
  });

  const ref = useRef(false);

  const isPaid = useMemo(() => {
    if (!bookingDate) return false;
    const payment = find(allPayments, (payment) => payment.eventId === eventId);

    //Already paid
    if (payment) return true;

    if (!session?.user?.name) return false;
    if (!data) return false;

    //check if payments from mail are in payments database
    const paymentsFromMailNotInDatabase = filter(data, (gmailPayment) => {
      const paymentFoundInDB = find(allPayments, (payment) => {
        return payment.gmailMailId === gmailPayment.id;
      });

      return !Boolean(paymentFoundInDB);
    }) as gmail_v1.Schema$Message[];

    const filteredPaymentsByEventDateAndAmount = filter(
      paymentsFromMailNotInDatabase,
      (payment) => {
        if (!payment.internalDate) return false;
        if (!payment.snippet) return false;

        const amount = getEuroAmount(payment.snippet);
        const paymentDate = new Date(Number(payment.internalDate));

        const dateInRange = isDateInCertainRange(paymentDate, bookingDate);
        const amountInRange = AMOUNT_LIST.includes(amount);

        return dateInRange && amountInRange;
      }
    );

    const paymentMissing = filteredPaymentsByEventDateAndAmount[0];
    if (!paymentMissing?.snippet) return false;
    if (!paymentMissing.internalDate) return false;

    const amount = getEuroAmount(paymentMissing.snippet);
    const id = paymentMissing.id;

    if (!id) return false;

    //Payment created
    if (!ref.current) {
      queue.enqueue(async () =>
        createPayment({
          eventId,
          amount,
          paymentDate: new Date(Number(paymentMissing.internalDate)),
          gmailMailId: id,
        })
      );
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
    queue,
  ]);

  return isPaid;
};
