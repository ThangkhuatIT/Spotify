import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const checkValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('asdasd')
    res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => e.msg),
    });
    return;
  }
  next();
};

export const validateUpdateProfile = () => {
  return [
    body("name", "name must be Alphanumeric")
      .optional()
      .isAlphanumeric("vi-VN", {
        ignore: " ",
      }),
  ];
};
export const validateRegister = () => {
  return [
    body("name", "name must be Alphanumeric")
      .notEmpty().withMessage("usename not empty")
      .isAlphanumeric("vi-VN", {
        ignore: " ",
      }),
    body("email").isEmail().notEmpty().withMessage("email not empty"),
    body("passWord").notEmpty().isLength({
      min: 8,
    }),
    body("passwordConfirmation")
      .notEmpty()
      .custom((value, { req }) => {
        return value === req.body.passWord;
      }),
    body("gender").notEmpty(),
    body("birtDate").notEmpty(),
  ];
};
export const validateLogin = () => {
  return [
    body("email").isEmail().notEmpty(),
    body("passWord").notEmpty().isLength({
      min: 8,
    }),
  ];
};
