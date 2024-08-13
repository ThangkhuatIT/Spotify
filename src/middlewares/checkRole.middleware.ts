import { NextFunction, Request, Response } from 'express'

export function checkRole(...roles: [string]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user
    if (!user) {
      return res.status(401).send({
        message: 'unauthoried'
      })
    }
    if (!roles.includes(user.role)) {
      return res.status(403).send({
        message: 'Forbidden'
      })
    }
    next()
  }
}
