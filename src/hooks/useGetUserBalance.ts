import { find, reduce } from "lodash";
import { trpc } from "../utils/trpc";

export const useGetUserBalance = () => {
  const { data: allPaymentsFromUser } = trpc.payment.getAllForUser.useQuery();
  const { data: allEventsFromUser } = trpc.event.getAllForUser.useQuery();

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
