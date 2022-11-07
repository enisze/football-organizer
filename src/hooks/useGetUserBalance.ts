import { find, reduce } from "lodash";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const useGetUserBalance = () => {
  const { data } = useSession();
  const { data: allPaymentsFromUser } = trpc.payment.getAllForUser.useQuery(
    undefined,
    {
      enabled: Boolean(data?.user),
    }
  );
  const { data: allEventsFromUser } = trpc.event.getAllForUser.useQuery(
    undefined,
    {
      enabled: Boolean(data?.user),
    }
  );

  if (!data?.user) return 0;
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

  return balance;
};
