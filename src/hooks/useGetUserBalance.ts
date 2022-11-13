import { find, reduce } from "lodash";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const useGetUserBalance = () => {
  const { data, status } = useSession();

  const { data: allPaymentsFromUser, isLoading: loadingPayments } =
    trpc.payment.getAllForUser.useQuery(undefined, {
      enabled: Boolean(data?.user),
    });
  const { data: allEventsFromUser, isLoading: loadingEvents } =
    trpc.event.getAllForUser.useQuery(undefined, {
      enabled: Boolean(data?.user),
    });

  const loading = loadingPayments || loadingEvents || status === "loading";

  if (!data?.user && !loading) return { balance: 0, loading };
  const balance = reduce(
    allPaymentsFromUser,
    (acc, payment) => {
      const event = find(
        allEventsFromUser,
        (event) => event.id === payment.eventId
      );
      if (!event) {
        return acc + payment.amount;
      }

      return acc;
    },
    0
  );

  return { balance, loading };
};
