import { verify } from 'jsonwebtoken'

export const verifyJWT = (JWT: string) => {
  let isJWTValid = false

  verify(JWT, process.env.JWT_SECRET as string, (error) => {
    if (error) {
      return
    }

    isJWTValid = true
  })

  return isJWTValid
}
