import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import { verifyJwt } from '../utils/jwt'

export async function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = decodeTokenFromRequest(req)
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized'
    })
  }
  try {
    const payload = await verifyJwt(token)
    req.body.user = payload
    next()
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized!'
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
