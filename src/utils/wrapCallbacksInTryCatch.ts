import { NextFunction } from 'express'

const wrapCallbacksInTryCatch = (func: any) => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
export default wrapCallbacksInTryCatch
