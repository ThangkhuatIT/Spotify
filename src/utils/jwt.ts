import { config } from 'dotenv'
import Config from '../config'
import jwt from 'jsonwebtoken'
import ApiError from './ApiError'
export function verifyJwt(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.SECERETKEY, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

export async function signJwt(payload: {}, time: string) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      Config.SECERETKEY,
      {
        algorithm: 'HS256',
        expiresIn: time
      },
      (err, token) => {
        if (err) {
          throw new ApiError(500, err.message)
        }
        resolve(token)
      }
    )
  })
}
