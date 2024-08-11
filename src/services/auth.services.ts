import { generateRandomString } from "../utils/randomString";
import { signJwt } from "../utils/jwt";
import * as authDtos from "../dtos/auth.dtos";
import * as tokenSevices from "../services/token.services";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";
import Config from "../config";
import User, { IUser } from "../models/User";
import { sendEmailQueue } from "./bullQueue.services";
import { Types } from "mongoose";
import Token from "../models/Token";
export async function register(payload: authDtos.registerDto): Promise<IUser> {
  const { email, name, birtDate, gender, passWord } = payload;
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "user already exists");
  }
  try {
    const passwordHash = await bcrypt.hash(passWord, 10);
    const newUser = new User({
      name: name,
      email: email,
      passWord: passwordHash,
      gender: gender,
      birtDate: birtDate,
    });
    await newUser.save();
    const newConfirmEmailToken = generateRandomString();
    const userId = newUser._id;
    await tokenSevices.saveConfirmEmailToken({
      userId: newUser._id,
      token: newConfirmEmailToken,
    });
    sendEmailQueue.add({
      newConfirmEmailToken,
      email,
      userId,
    });
    return newUser;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

export async function login(payload: authDtos.loginDto): Promise<{
  user: IUser;
  accessToken: string;
  refreshToken: string;
}> {
  const { email, passWord } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }
  const isMatchPassword = await bcrypt.compare(passWord, user.passWord);
  if (!isMatchPassword) {
    throw new ApiError(401, "Invalid credentials");
  }
  if (user.locked) {
    throw new ApiError(403, "You are locked out!");
  }
  const [accessToken, refreshToken] = await Promise.all([
    signJwt({ user: user }, Config.ACCESS_TOKEN_EXPIRATION),
    signJwt({ user: user }, Config.REFRESH_TOKEN_EXPIRATION),
  ]);
  return {
    user: user,
    accessToken: accessToken as string,
    refreshToken: refreshToken as string,
  };
}
export async function verifyEmail(token: string, id: string) {
  const user = await User.findOne({ _id: id });
  if (!user) throw new ApiError(404, "User not found");
  if (user.emailConfirmed) return;
  const emailConfirmToken = await Token.findOne({ token: token });
  if (
    !emailConfirmToken ||
    emailConfirmToken.type != "CONFIRM_EMAIL" ||
    emailConfirmToken.expirytime < new Date()
  ) {
    throw new ApiError(401, "Invalid token");
  }
  user.emailConfirmed = true;
  await Promise.all([user.save(), Token.deleteOne({ token: token })]);
}
