import { router } from "../trpc";
import { eventRouter } from "./event";
import { gmailRouter } from "./gmail";
import { mapRouter } from "./map";
import { paymentRouter } from "./payment";
import { userRouter } from "./user";

export const appRouter = router({
  event: eventRouter,
  gmail: gmailRouter,
  payment: paymentRouter,
  user: userRouter,
  map: mapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
