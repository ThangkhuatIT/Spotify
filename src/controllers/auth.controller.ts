import { Request, Response } from "express";
import { Types } from "mongoose";
import * as authService from "../services/auth.services";
import { IUser } from "../models/User";
export async function register(
  req: Request,
  res: Response
) {
  const { birtDate, name, gender, email, passWord } = req.body;
  const newuser = await authService.register({
    birtDate,
    name,
    gender,
    email,
    passWord,
  });
  return res.status(200).json({
    id: newuser._id,
    email: newuser.email,
  });
}
export async function login(
  req: Request,
  res: Response
) {
  const user = await authService.login(req.body)
  return res.status(200).json(user)
}
export async function verifyEmail(
  req: Request,
  res: Response
) {
  const {token, id} = req.query
   await authService.verifyEmail(token as string,id as string)
  return res.status(200).json('ok')
}
