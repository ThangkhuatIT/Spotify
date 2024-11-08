import {model, Schema, Types } from 'mongoose'
export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  image: string
  imageId:string
  password: string
  createdAt: Date
  updatedAt: Date
  emailConfirmed: boolean
  locked: boolean
  role: string
  followerCount: number
  birthDate?: Date
  gender?: string
  about?: string
  alias?: string
}

const userSchema = new Schema<IUser>(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    emailConfirmed: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['MEMBER', ' ARTIST', 'ADMIN'],
      default: 'MEMBER'
    },
    followerCount: {
      type: Number,
      default: 0
    },
    birthDate: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER',''],
      default: ''
    },
    about: {
      type: String,
      default:''
    },
    alias: {
      type: String,
      default:''
    },
    image: {
      type: String,
      default:''
    },
    imageId: {
      type: String,
      default:''
    }
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        delete ret.__v
      }
    },
    versionKey:false
  }
)

const User = model('User', userSchema)

export default User
