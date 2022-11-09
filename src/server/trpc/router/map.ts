import { TRPCError } from "@trpc/server";
import { z } from "zod";

import axios from "axios";
import { getAddressAndCoordinatesRedisKeys } from "../../../helpers/getAddressAndCoordinatesRedisKeys";
import { redis } from "../../redis/redis";
import { protectedProcedure, router } from "../trpc";

const LATLONG_API_KEY = process.env.LATLONG_API_KEY;

export const mapRouter = router({
  getLatLong: protectedProcedure
    .input(z.object({ id: z.string(), address: z.string() }))
    .query(async ({ input }) => {
      const { id, address } = input;

      if (!address) return null;

      const { addressKey, coordinatesKey } =
        getAddressAndCoordinatesRedisKeys(id);

      const cachedAddress = await redis.get(addressKey);

      if (cachedAddress === address) {
        return await redis.get(coordinatesKey);
      }

      await redis.set(addressKey, address);

      try {
        const { data } = await axios.get(
          `http://api.positionstack.com/v1/forward?access_key=${LATLONG_API_KEY}&query=${address}`
        );
        const coordinates = `${data.longitude},${data.latitude}`;

        await redis.set(coordinatesKey, coordinates);

        return coordinates;
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
