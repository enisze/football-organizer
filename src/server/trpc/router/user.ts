import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  cancelEvent: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const id = session.user.id;
      await prisma.participantsOnEvents.update({
        where: {
          id_eventId: {
            eventId: input.eventId,
            id,
          },
        },
        data: {
          userEventStatus: "CANCELED",
        },
      });
    }),
});
