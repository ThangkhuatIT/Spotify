import { model, Schema, Types } from "mongoose";
import Enums from "./enum";

export interface ISong {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  songUrl?: string;
  imageUrl?: string;
  imangeId?: string;
  length: number;
  releasedAt?: Date;
  likeCount: number;
  listenCount: number;
  alias?: string;
  language: string;
  artists: Types.ObjectId[];
}
const songSchema = new Schema<ISong>(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    songUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    imangeId: {
      type: String,
    },
    releasedAt: {
      type: Date,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    listenCount: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      enum: ["NONE", "JAPANESE", "VIETNAMESE", "ENGLISH", "CHINESE", "KOREAN"],
      default: "NONE",
    },
    length: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        delete ret.__v;
      },
    },
  }
);

const Song = model("Song", songSchema);

export default Song;
