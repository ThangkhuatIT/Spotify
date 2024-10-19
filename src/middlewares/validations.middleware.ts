import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map((e) => e.msg)
    })
    return
  }
  next()
}

export const validateUpdateProfile = () => {
  return [
    body('name', 'name must be Alphanumeric').optional().isAlphanumeric('vi-VN', {
      ignore: ' '
    })
  ]
}
export const validateRegister = () => {
  return [
    body('name', 'name must be Alphanumeric').notEmpty().withMessage('usename not empty').isAlphanumeric('vi-VN', {
      ignore: ' '
    }),
    body('email').isEmail().notEmpty().withMessage('email not empty'),
    body('password').notEmpty().isLength({
      min: 8
    }),
    body('passwordConfirmation')
      .notEmpty()
      .custom((value, { req }) => {
        return value === req.body.password
      }),
  ]
}
export const validateLogin = () => {
  return [
    body('email').notEmpty().isEmail().withMessage("Invalid email"),
    body('passWord').notEmpty().isLength({
      min: 8
    }).withMessage("Password must greater than 8 characters"),
  ]
}
export const validatePostSong = () => {
  return [
    body('name').notEmpty().withMessage('Name not empty'),
    body('songUrl').notEmpty().withMessage('Song not empty'),
    body('imageUrl').notEmpty().withMessage('Image not empty'),
    body('length').notEmpty().withMessage('Length not empty'),
    body('language').notEmpty().withMessage('Language not empty'),
    body('genre').notEmpty().withMessage('Genre not empty')
  ]
}
export const validateCreateGenre = () => {
  return [
    body('name').notEmpty().withMessage('Name not empty'),
    body('imageUrl').notEmpty().withMessage('Image not empty')
  ]
}
