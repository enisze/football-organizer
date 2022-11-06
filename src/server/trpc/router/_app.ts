import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { gmailRouter } from "./gmail";

export const appRouter = router({
  event: eventRouter,
  auth: authRouter,
  gmail: gmailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
