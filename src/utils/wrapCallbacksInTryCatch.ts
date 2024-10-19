import { NextFunction } from 'express'
import ApiError from './ApiError'

export const wrapCallbacksInTryCatch = (func: any) => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
export const wrapTryCatch = <T, U>(funs: (payload: T) => Promise<U>) => {
  return async (payload: T): Promise<U> => {
    try {
      return await funs(payload);
    } catch (error: any) {
      throw new ApiError(500, error.message);
    }
  };
};