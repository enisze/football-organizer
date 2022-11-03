import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const googleMail = router({
  test: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      const a = fetch("goog");
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
