import { Types } from "mongoose";
import Token, { IToken } from "../models/Token";
import { TokenType } from "../models/enum";
import ApiError from "../utils/ApiError";

export async function saveConfirmEmailToken({
  userId,
  token,
}: {
  userId: Types.ObjectId;
  token: string;
}): Promise<IToken> {
  try {
    const expirytime = new Date();
    expirytime.setDate(expirytime.getDate() + 1);
    const newToken = new Token({
      userId: userId,
      token: token,
      type: "CONFIRM_EMAIL",
      expirytime: expirytime,
    });
    newToken.save();
    return newToken;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}
export async function deleteToken(token: string, userId: Types.ObjectId) {
  await Token.deleteOne({ userId, token });
}