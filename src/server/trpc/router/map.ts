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

      try {
        await redis.ping();
      } catch (error) {
        await redis.connect();
      }

      if (!address) return null;

      const { addressKey, coordinatesKey } =
        getAddressAndCoordinatesRedisKeys(id);

      const cachedAddress = await redis.get(addressKey);
      const coordinates = await redis.get(coordinatesKey);

      if (
        coordinates !== "undefined,undefined" &&
        coordinates &&
        cachedAddress === address
      ) {
        redis.disconnect();
        return mapCoordinatesToArray(coordinates);
      } else {
        await redis.set(addressKey, address);

        try {
          const {
            data: { data },
          } = await axios.get(
            `http://api.positionstack.com/v1/forward?access_key=${LATLONG_API_KEY}&query=${address}`
          );
          const longitude = data[0].longitude;
          const latitude = data[0].latitude;

          if (!latitude || !longitude) {
            redis.disconnect();
            return null;
          }
          const coordinates = `${longitude},${latitude}`;

          await redis.set(coordinatesKey, coordinates);

          redis.disconnect();
          return mapCoordinatesToArray(coordinates);
        } catch (error) {
          console.log(error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      }
    }),
});

const mapCoordinatesToArray = (coordinates: string | null) => {
  const split = coordinates?.split(",");
  if (!split) return null;
  return [Number(split[0]), Number(split[1])];
};
