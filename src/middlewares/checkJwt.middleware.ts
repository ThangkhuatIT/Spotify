import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import { verifyJwt } from '../utils/jwt'

export async function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = decodeTokenFromRequest(req)
  if (!token) {
    return res.status(401).send({
       error: "Unauthorized",
       message: "no tokens"
    })
  }
  try {
    const payload = await verifyJwt(token) as any
    req.body.user = payload.user
    next()
  } catch (error) {
    return res.status(401).send({
       error: "Unauthorized",
       message: "Token expired"
    })
  }
}
function decodeTokenFromRequest(request: Request) {
  if (request.headers['authorization']) {
    const values = request.headers['authorization'].split(' ')
    return values[1]
  }

  return undefined
}
