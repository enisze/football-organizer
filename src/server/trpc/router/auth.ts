import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  addToRedis: publicProcedure.query(async () => {
    // const result = await redis.set("latlong", "test", (res) => {
    //   console.log("done");
    //   console.log(res);
    // });
    // console.log(result);

    // const a = await redis.get("latlong");

    // const a = await redis.get("latlong");
    // const b = await redis.del("latlong");
    // const c = await redis.get("latlong");

    return "done";
  }),
});
