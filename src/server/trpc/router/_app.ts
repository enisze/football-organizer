import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";

export const appRouter = router({
  event: eventRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
