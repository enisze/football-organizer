import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const useUserPaidEvent = (eventId: id) => {
  const { data: session } = useSession();

  const { data } = trpc.gmail.listLabels.useQuery();

  if (!session?.user?.name) return false;
  if (!data) return false;

  const res = data[0]?.snippet?.split("€");

  if (!res) return false;

  if (res[0]) {
    const amount = res[0].replace(/\D/g, "");
  }
};
