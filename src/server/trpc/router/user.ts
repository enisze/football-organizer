import { map } from "lodash";
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
  getUserNamesByIds: protectedProcedure
    .input(z.object({ ids: z.string().array() }))
    .query(async ({ ctx: { prisma }, input }) => {
      const res = await Promise.all(
        map(input.ids, (id) =>
          prisma.user.findUnique({
            where: {
              id,
            },
            select: { name: true, id: true },
          })
        )
      );
      return res;
    }),

  deleteAll: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    await prisma.user.deleteMany();
  }),
});
