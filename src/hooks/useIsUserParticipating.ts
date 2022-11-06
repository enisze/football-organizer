import type { User } from "@prisma/client";
import { reduce } from "lodash";
import { useSession } from "next-auth/react";

export const useIsUserParticipating = (participants: User[]) => {
  const { data } = useSession();
  if (!data?.user?.email) return false;
  return reduce(
    participants,
    (acc: string[], participant) => {
      if (participant.email) {
        return [...acc, participant.email];
      }
      return acc;
    },
    []
  ).includes(data.user.email);
};
