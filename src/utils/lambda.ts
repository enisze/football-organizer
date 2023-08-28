import { eventRouter } from "../server/trpc/router/event";
import { gmailRouter } from "../server/trpc/router/gmail";
import { groupRouter } from "../server/trpc/router/group";
import { mapRouter } from "../server/trpc/router/map";
import { paymentRouter } from "../server/trpc/router/payment";
import { userRouter } from "../server/trpc/router/user";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/lambda/**
export const lambdaRouter = createTRPCRouter({
  event: eventRouter,
  gmail: gmailRouter,
  payment: paymentRouter,
  user: userRouter,
  map: mapRouter,
  group: groupRouter,
});


