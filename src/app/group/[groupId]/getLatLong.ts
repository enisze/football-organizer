import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { mapCoordinatesToArray } from '@/src/server/map'

import { redis } from '@/src/server/db/redis'

import axios from 'axios'

const LATLONG_API_KEY = process.env.LATLONG_API_KEY

export const getLatLong = async (
  events: Array<{ address: string; id: string }>,
) => {
  const map = new Map<string, number[]>()

  try {
    if (!redis.isOpen) {
      await redis.connect()
    }

    await Promise.all(
      events.map(async (event) => {
        const { address, id } = event

        const { addressKey, coordinatesKey } =
          getAddressAndCoordinatesRedisKeys(id)

        const cachedAddress = await redis.get(addressKey)

        const coordinates = await redis.get(coordinatesKey)

        if (
          coordinates !== 'undefined,undefined' &&
          coordinates &&
          cachedAddress === address
        ) {
          setMapValues(map, coordinates, id)
        } else {
          await redis.set(addressKey, address)

          const {
            data: { data },
          } = await axios.get(
            `http://api.positionstack.com/v1/forward?access_key=${LATLONG_API_KEY}&query=${address}`,
          )
          const longitude = data[0].longitude
          const latitude = data[0].latitude

          if (!latitude || !longitude) {
            return null
          }
          const coordinates = `${longitude},${latitude}`

          await redis.set(coordinatesKey, coordinates)

          setMapValues(map, coordinates, id)
        }
      }),
    )

    return map
  } catch (error) {
    console.log(error)
    throw new Error('INTERNAL_SERVER_ERROR')
  } finally {
    redis.disconnect()
  }
}

const setMapValues = (
  map: Map<string, number[]>,
  coordinates: string,
  id: string,
) => {
  const numberArrray = mapCoordinatesToArray(coordinates)
  if (numberArrray) {
    map.set(id, numberArrray)
  }
}
