import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  test: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.event.create({
      data: { address: "test", endDate: new Date(), startDate: new Date() },
    });
  }),
});
