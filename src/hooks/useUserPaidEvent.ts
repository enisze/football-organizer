import { isAfter } from "date-fns";
import { gmail_v1 } from "googleapis";
import { filter, find } from "lodash";
import { useSession } from "next-auth/react";
import { getEuroAmount } from "../helpers/getEuroAmount";
import { trpc } from "../utils/trpc";

export const useUserPaidEvent = async (eventId: string) => {
  const { data: session } = useSession();

  const { data } = trpc.gmail.listLabels.useQuery();
  const { data: allPayments } = trpc.payment.getAll.useQuery();
  const { mutateAsync: createPayment } = trpc.payment.create.useMutation();

  const payment = find(allPayments, (payment) => {
    payment.eventId === eventId;
  });

  //Already paid
  if (payment) return true;

  //Payments from mail
  const paymentsAfterNovember = filter(data, (d) => {
    if (!d.internalDate) return false;

    const paymentDate = new Date(d.internalDate);
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

      return Boolean(
        find(allPayments, (payment) => {
          payment.amount === amount;
        })
      );
    }
  ) as gmail_v1.Schema$Message[];

  const paymentMissing = paymentsFromMailNotInDatabase[0];

  if (!paymentMissing?.snippet) return false;

  const amount = getEuroAmount(paymentMissing.snippet);

  if (!paymentMissing.internalDate) return false;

  //Payment created
  await createPayment({
    eventId,
    amount,
    paymentDate: new Date(paymentMissing.internalDate),
  });

  return true;
};
