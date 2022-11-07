import type { User } from "@prisma/client";
import { reduce } from "lodash";
import { useSession } from "next-auth/react";

export const useIsUserParticipating = (participants: User[]) => {
  const { data } = useSession();
  if (!data?.user?.id) return false;
  return reduce(
    participants,
    (acc: string[], participant) => {
      if (participant.id) {
        return [...acc, participant.id];
      }
      return acc;
    },
    []
  ).includes(data.user.id);
};
