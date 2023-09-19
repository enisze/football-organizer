import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { redis } from '@/src/server/redis/redis'
import { mapCoordinatesToArray } from '@/src/server/trpc/router/map'
import axios from 'axios'

const LATLONG_API_KEY = process.env.LATLONG_API_KEY

export const getLatLong = async (address: string, id: string) => {
  try {
    await redis.ping()
  } catch (error) {
    console.log('connecting')
    await redis.connect()
  }

  if (!address) return null

  const { addressKey, coordinatesKey } = getAddressAndCoordinatesRedisKeys(id)

  const cachedAddress = await redis.get(addressKey)
  const coordinates = await redis.get(coordinatesKey)

  if (
    coordinates !== 'undefined,undefined' &&
    coordinates &&
    cachedAddress === address
  ) {
    return mapCoordinatesToArray(coordinates)
  } else {
    await redis.set(addressKey, address)

    try {
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

      return mapCoordinatesToArray(coordinates)
    } catch (error) {
      console.log(error)
      throw new Error('INTERNAL_SERVER_ERROR')
    }
  }
}
